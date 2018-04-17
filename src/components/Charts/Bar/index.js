import React, { Component } from 'react';
import { Chart, Axis, Tooltip, Geom, Coord, Label, Legend } from 'bizcharts';
import styles from '../index.less';
import DataSet from '@antv/data-set';

class Bar extends Component {

  handleRoot = (n) => {
    this.root = n;
  };

  handleRef = (n) => {
    this.node = n;
  };

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
      formatPercent, //转换函数
      fieldsMap = {
        x: '',
        keyMap: {}
      }, //data映射结构
      dodge = 0,
      keyLabelRotate = 0, //key坐标文字旋转角度
      axisValueLabel = {
        textStyle: {
          fill: color,
        },
        formatter: text => formatPercent ? formatPercent(text - 0) : text
      }, //设置value坐标文本样式
      axisKeyLabel = {
        offset: 15,
        textStyle: {
          textAlign: transpose ? 'start' : 'center', // 文本对齐方向，可取值为： start center end
          fontSize: 14,
          color: '#333',
          rotate: keyLabelRotate,
        },
        autoRotate: keyLabelRotate === 0 ? true : false  
      }, //设置key坐标文本样式
      pbg = null, //绘图区域的边框和背景样式
      axisLine = {
        stroke: '#e8e8e8',
        lineWidth: 1
      } //设置刻度线样式
    } = this.props;

    const ds = new DataSet();
    const dv = ds.createView().source(data);
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
    const position = `${fieldsMap.x}*value`
    return (
      <div className={styles.chart} style={{ height }} ref={this.handleRoot}>
        <div ref={this.handleRef}>
          <Chart
            height={height}
            forceFit={forceFit}
            data={dv}
            padding={padding || 'auto'}
            plotBackground={pbg}
          >
            {transpose && (<Coord transpose />)}
            {legend && (<Legend name='key' position="top"/>)}
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
            <Tooltip showTitle />
            <Geom 
              size={size}
              type="interval" 
              position={position} 
              color={['key',color]} 
              adjust={[{type: 'dodge',marginRatio: dodge}]}
              tooltip={tooltip}>
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
                    formatter={text => formatPercent ? formatPercent(text - 0) : text}
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
