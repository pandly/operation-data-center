import React, { Component } from 'react';
import { Chart, Axis, Tooltip, Geom, Coord, Label, Legend } from 'bizcharts';
import styles from '../index.less';
import DataSet from '@antv/data-set';
import shape from './shape';


class Bar extends Component {
  componentWillMount() {
    this.props.useShape&&shape(this.props.transpose)
    this.props.data&&this.setBase(this.props.data)
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.transpose !== nextProps.transpose){
      shape(nextProps.transpose)
    }
    if(this.props.data !== nextProps.data){
      nextProps.data&&this.setBase(nextProps.data)
    }
  }
  
  
  handleRoot = (n) => {
    this.root = n;
  };

  handleRef = (n) => {
    this.node = n;
  };

  max = null
  min = null
  tickInterval = null
  setBase = data =>{
    const {fieldsMap} = this.props;
    const dataArr = data.map(ele=> ele[Object.keys(fieldsMap.keyMap)[0]]||0)
    const [max,min] = [Math.max(...dataArr),Math.min(...dataArr)]
    const avaReduce = (max-min)/ dataArr.length;
    const smooth= (number)=>{
      let midN = String(number);
      let decimalLength = /0(\.0*)[1-9]/.test(midN)?midN.match(/0(\.0*)[1-9]/)[1].length:0;
      midN = Math.pow(10,decimalLength)*midN;
      let str =   String(Math.round(midN));
      midN = str.substr(0,1)+str.substr(1).replace(/[0-9]/g,0);
      return +midN/Math.pow(10,decimalLength)
    }
    let smoothReduce = smooth(avaReduce)
    this.max = Math.ceil(max/smoothReduce +1)*smoothReduce
    this.tickInterval = smoothReduce
    this.min = min
    return Math.ceil(max/smoothReduce +1)*smoothReduce
  }

  render() {
    const {
      height,
      forceFit = true,
      data = [],
      color,
      legend = true,
      padding,
      label = true,
      transpose = false,
      size,
      formatPercent, // 转换函数
      fieldsMap = {
        x: '',
        keyMap: {},
      }, // data映射结构
      dodge = 0,
      keyLabelRotate = 0, // key坐标文字旋转角度
      axisValueLabel = {
        textStyle: {
          fill: color,
        },
        formatter: text => (formatPercent ? formatPercent(text - 0) : text),
      }, // 设置value坐标文本样式
      axisKeyLabel = {
        offset: 15,
        textStyle: {
          textAlign: transpose ? 'start' : 'center', // 文本对齐方向，可取值为： start center end
          fontSize: 14,
          color: '#333',
          rotate: keyLabelRotate,
        },
        autoRotate: keyLabelRotate === 0,
      }, // 设置key坐标文本样式
      pbg = null, // 绘图区域的边框和背景样式
      axisLine = {
        stroke: '#e8e8e8',
        lineWidth: 1,
      }, // 设置刻度线样式
      showBase,
      useShape,
      labelSetting,
      chartSetting,
    } = this.props;
    let newData = data.map(ele=>({...ele,_base: this.max}));
    const ds = new DataSet();
    const dv = ds.createView().source(newData);
    dv.transform({
      type: 'rename',
      map: fieldsMap.keyMap,
    })
      .transform({
        type: 'fold',
        fields: Object.values(fieldsMap.keyMap), // 展开字段集
        key: 'key', // key字段
        value: 'value', // value字段
      });
    const tooltip = [
      'key*value',
      (key, value) => ({
        name: key,
        value: formatPercent ? formatPercent(value) : value,
      }),
    ];
    const position = `${fieldsMap.x}*value`;
    let scale = {
      value:{
        type: 'linear',
        nice: false,
        max: this.max,
        min: 0,
        // tickInterval: this.tickInterval
      }, 
    }

    return (
      <div className={styles.chart} style={{ height }} ref={this.handleRoot} >
        <div ref={this.handleRef}>
          <Chart
            height={height}
            forceFit={forceFit}
            data={dv}
            padding={padding || 'auto'}
            plotBackground={pbg}
            scale={scale}
            {
              ...chartSetting
            }
          >
            {transpose && (<Coord transpose />)}
            {legend && (<Legend name="key" position="top" />)}
            <Axis
              name={fieldsMap.x}
              position={transpose && 'top'}
              label={axisKeyLabel}
              line={axisLine}
              tickLine={null}
            />
            <Axis
              grid={null}
              name="value"
              label={axisValueLabel}
              line={axisLine}
            />
            <Axis name={'_base'}  visible={false} />

            <Tooltip showTitle />
            {
              showBase
              &&<Geom  
                size={size} 
                type="interval" 
                position={`${fieldsMap.x}*_base`} 
                color={color||'#000'} 
                shape={useShape&&shape[Symbol.for('name')]} 
                opacity={0.3}
                />
            }
            <Geom
              size={size}
              type="interval"
              position={position}
              color={['key', color]}
              adjust={[{ type: 'dodge', marginRatio: dodge }]}
              tooltip={tooltip}
              shape= {useShape&&shape[Symbol.for('name')]}
            >
              {label && (
                  <Label
                    content="value"
                    textStyle={{
                      textAlign: 'center', // 文本对齐方向，可取值为： start middle end
                      fill: color, // 文本的颜色
                      fontSize: '12', // 文本大小
                      //fontWeight: 'bold', // 文本粗细
                      //rotate: -30,
                      textBaseline: 'middle' // 文本基准线，可取 top middle bottom，默认为middle
                    }}
                    offset={10}
                    formatter={text => (formatPercent ? formatPercent(text - 0) : text)}
                    {
                      ...labelSetting
                    }
                  />
                )}
            </Geom>
          </Chart>
        </div>
      </div>
    );
  }
}

export default Bar;
