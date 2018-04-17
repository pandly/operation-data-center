import React, { Component } from 'react';
import { Chart, Axis, Tooltip, Geom, Coord, Label, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import styles from '../index.less';

class DodgeBar extends Component {

  handleRoot = (n) => {
    this.root = n;
  };

  handleRef = (n) => {
    this.node = n;
  };

  render() {
    const {
      height,
      title,
      forceFit = true,
      data = [],
      barColor,
      xRotate,
      padding = [50, 20, 80, 50],
      size,
      type = 'interval'
    } = this.props;

    let dv = [];
    if(data.length) {
      const fields = Object.keys(data[0]);
      const index = fields.indexOf('name')
      fields.splice(index, 1);      
      const ds = new DataSet();
      dv = ds.createView().source(data);
      dv.transform({
        type: 'fold',
        fields, // 展开字段集
        key: 'key', // key字段
        value: 'value', // value字段
      });
    }
    const label = {
      offset: 15, // 数值，设置坐标轴文本 label 距离坐标轴线的距离
      // 设置文本的显示样式，还可以是个回调函数，回调函数的参数为该坐标轴对应字段的数值
      textStyle: {
        textAlign: 'end', // 文本对齐方向，可取值为： start center end
        fill: '#666', // 文本的颜色
        fontSize: '12', // 文本大小
        //fontWeight: 'bold', // 文本粗细
        rotate: xRotate, 
        textBaseline: 'middle' // 文本基准线，可取 top middle bottom，默认为middle
      },
      autoRotate: false, // 文本是否需要自动旋转，默认为 true
    }
    return (
      <div className={styles.chart} style={{ height }} ref={this.handleRoot}>
        <div ref={this.handleRef}>
          <Chart
            height={title ? height - 41 : height}
            forceFit={forceFit}
            data={dv}
            padding={padding || 'auto'}
          >
            <Axis
              name="key"
              label={label}
            />
            <Axis 
              name="value" 
            />
            <Tooltip crosshairs />
            <Legend position='top' />
            <Geom 
              size={size}
              type={type} 
              position="key*value" 
              color={['name', barColor]} 
              adjust={[{type: 'dodge',marginRatio: 0}]}>
            </Geom>  
          </Chart>
        </div>
      </div>
    );
  }
}

export default DodgeBar;
