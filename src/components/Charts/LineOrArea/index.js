import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis } from 'bizcharts';
import DataSet from '@antv/data-set';
import autoHeight from '../autoHeight';
import styles from './index.less';

@autoHeight()
export default class LineOrArea extends React.Component {
  render() {
    const {
      title,
      area = false,
      point = false,
      line = false,
      bar = false,
      barWidth = 10,
      height = 400,
      titleMap = {},
      borderWidth = 1,
      data = [],
      padding,
      lineColor,
      areaColor,
      lineWidth = 1,
      pointSize = 4,
      opacity = [1],
      legend = true,
      type = 'line',
      shape,
      xAxisRotate,
      scale,
<<<<<<< HEAD
      GeomConfig={}
=======
      GeomConfig,
      LegendSetting
>>>>>>> 05e7d3bb80a2633fcebcba7ef4cd3a65bfab5f63
    } = this.props;
    
    const position = `${titleMap.x}*value`
    const ds = new DataSet();
    const dv = ds.createView();
    dv.source(data)
      //重命名
      .transform({
        type: 'rename',
        map: titleMap.filedsMap,
      })
      //将fileds中对应字段的内容转换成key:value的形式
      .transform({
        type: 'fold',
        fields: Object.values(titleMap.filedsMap), // 展开字段集
        key: 'key', // key字段
        value: 'value', // value字段
      }); 
    const xlabel = {
      offset: 15, // 数值，设置坐标轴文本 label 距离坐标轴线的距离
      // 设置文本的显示样式，还可以是个回调函数，回调函数的参数为该坐标轴对应字段的数值
      textStyle: {
        textAlign: 'start', // 文本对齐方向，可取值为： start center end
        fill: '#333', // 文本的颜色
        fontSize: '14', // 文本大小
        //fontWeight: 'bold', // 文本粗细
        rotate: xAxisRotate, 
        //textBaseline: 'middle' // 文本基准线，可取 top middle bottom，默认为middle
      },
      autoRotate: xAxisRotate ? false : true, // 文本是否需要自动旋转，默认为 true
    }
    //设置刻度线样式
    const axisLine = {
      stroke: '#e8e8e8',
      lineWidth: 1
    };

    return (
      <div className={styles.timelineChart} style={{ height: height }}>
        <div>
          <Chart height={height} padding={padding || 'auto'} data={dv} forceFit scale={scale}>
            <Axis 
              name={titleMap.x}
              label={xlabel}
              line={axisLine}
              tickLine={null}
            />
            <Axis 
              grid={null}
              name="value"
              line={axisLine} 
            />
            <Tooltip crosshairs />
            {legend && (<Legend name='key' position="top" {...LegendSetting}/>)}
            {area && (
              <Geom 
                type="area"
                shape={shape} 
                position={position} 
                opacity={opacity}
                tooltip={false}
                color={areaColor ? areaColor : lineColor}
                {...GeomConfig?GeomConfig.area:{}}
                 />
            )}
            {line && (
              <Geom
                type="line"
                shape={shape}
                position={position}
                color={['key',lineColor]}
                size={lineWidth}
                tooltip={['key*value', (key, value) => {
                  return {
                    name: key,
                    value: value
                  }
                }]}
                {...GeomConfig?GeomConfig.line:{}}
              />
            )}
            {point && (
              <Geom 
                type='point' 
                position={position} 
                size={pointSize} 
                shape={'circle'} 
                tooltip={false}
                color={['key', lineColor]}
                {...GeomConfig?GeomConfig.point:{}}
                />
            )}         
          </Chart>
        </div>
      </div>
    );
  }
}
