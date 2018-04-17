import React, { Component } from 'react';
import { Chart, Tooltip, Geom, Coord, Label, Guide, Legend } from 'bizcharts';
import { DataView } from '@antv/data-set';
import { Divider } from 'antd';
import classNames from 'classnames';
import ReactFitText from 'react-fittext';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import autoHeight from '../autoHeight';

import styles from './index.less';

const { Html } = Guide;
/* eslint react/no-danger:0 */
@autoHeight()
export default class Pie extends Component {
  state = {
    legendData: [],
  };

  componentDidMount() {
    this.getLengendData();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      // because of charts data create when rendered
      // so there is a trick for get rendered time
      this.setState(
        {
          legendData: [...this.state.legendData],
        },
        () => {
          this.getLengendData();
        }
      );
    }
  }

  getG2Instance = (chart) => {
    this.chart = chart;
  };

  // for custom lengend view
  getLengendData = () => {
    if (!this.chart) return;
    const geom = this.chart.getAllGeoms()[0]; // 获取所有的图形
    const items = geom.get('dataArray') || []; // 获取图形对应的

    const legendData = items.map((item) => {
      /* eslint no-underscore-dangle:0 */
      const origin = item[0]._origin;
      origin.color = item[0].color;
      origin.checked = true;
      return origin;
    });

    this.setState({
      legendData,
    });
  };

  handleRoot = (n) => {
    this.root = n;
  };

  render() {
    const {
      valueFormat,
      subTitle,
      total,
      style,
      hasLegend = false,
      hasLabel = false,
      legendWidth = 90,
      className,
      height,
      width,
      forceFit = true, //自适应，开启后widht属性失效
      percent = 0,
      color,
      innerRadius = 0.5,  //圈的粗细
      radius = 1, //圈的大小
      animate = true,
      colors,
      rose = false, //玫瑰图
      lineWidth = 0,
      tooltip = true,
      data = [],
      guide = false
    } = this.props;
    
    const pieClassName = classNames(styles.pie, className, {
      [styles.hasLegend]: true,
    });
    const { legendData } = this.state;
    const tooltipFormat = [
      'item*percent',
      (x, p) => ({
        name: x,
        value: `${(p * 100).toFixed(2)}%`,
      }),
    ];

    const padding = [0, 10, 0, 10];

    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    
    //图表类型样式
    const gemStyle = {
      lineWidth, //饼图区块间隔距离
      stroke: '#fff' //饼图区块间隔之间的颜色
    }
    return (
      <div ref={this.handleRoot} className={pieClassName} style={style}>
        <ReactFitText maxFontSize={25}>
          <div className={styles.chart}>
            <Chart
              height={height}
              width={width}
              forceFit={forceFit} 
              data={dv}
              padding={padding}
              animate={animate}
              padding={padding}
              onGetG2Instance={this.getG2Instance}
            >
              {tooltip && <Tooltip showTitle={false} />}
              <Coord type={rose ? 'polar' : 'theta'} innerRadius={innerRadius} radius={radius}/>
              {(subTitle || total) && (
                <div className={styles.total}>
                  {subTitle && <h4 className="pie-sub-title" style={{ color: '#666', fontSize: '14px' }}>{subTitle}</h4>}
                  {total && <div className="pie-stat" style={{ color: '#15984B', fontSize: '20px' }} dangerouslySetInnerHTML={{ __html: total }} />}
                </div>
              )}
              <Geom
                style={gemStyle}
                tooltip={tooltip && tooltipFormat}
                type="intervalStack"
                position={rose ? 'item*count' : 'percent'}
                color={['item', colors]}
              >
                {hasLabel && (
                  <Label
                    content='percent'
                    autoRotate='false'
                    //offset={-40}
                    textStyle={{
                      //textAlign: 'center',
                      //textBaseline: 'middle',
                      //fontSize: '24', 
                      //lineWidth: 4, // 线的粗细
                      //stroke: '#ff8800', // 线的颜色
                      //lineDash: [ 2, 1 ], // 虚线样式
                      //rotate: 0,
                      //shadowBlur: 2,
                      //shadowColor: 'rgba(0, 0, 0, .45)'
                    }}
                    htmlTemplate={(text, item, index)=>{
                      // text 为每条记录 x 属性的值
                      // item 为映射后的每条数据记录，是一个对象，可以从里面获取你想要的数据信息
                      // index 为每条记录的索引
                      var point = item.point; // 每个弧度对应的点
                      const percent = (point.percent * 100).toFixed(2) + '%';
                      const count = valueFormat ? valueFormat(point.count) : point.count;
                      // 自定义 html 模板
                      return `<span style="color: ${point.color}; font-size: 14px;"> 
                               ${percent} 
                              </span>
                              <span style="display: inline-block;width: max-content; font-size: 20px; color: #333;">
                               ${count}
                              </span><br>`;
                    }}
                    /*formatter={(val, item) => {
                      return item.point.item + ': ' + item.point.count;}
                    }*/
                  />
                )}
              </Geom>
            </Chart>
          </div>
        </ReactFitText>
        {hasLegend && (
          <ul className={styles.legend} style={{ width: legendWidth }}>
            {legendData.map((item, i) => (
              <li key={item.item}>
                <span
                  className={styles.dot}
                  style={{ backgroundColor: item.color }}
                />
                <span className={styles.legendTitle}>{item.item}</span>
                {hasLegend === 'all' && (
                  <span>
                    <Divider type="vertical" />
                    <span className={styles.percent}>
                      {`${(isNaN(item.percent) ? 0 : item.percent * 100).toFixed(2)}%`}
                    </span>
                    <span
                      className={styles.value}
                      dangerouslySetInnerHTML={{
                        __html: valueFormat ? valueFormat(item.count) : item.count,
                      }}
                    />
                  </span>
                )}             
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
