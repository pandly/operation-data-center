import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { computeDays, transformArr } from '../../../utils/utils';
import {
  Row,
  Col,
  Card,
  Icon,
} from 'antd';
import {
  LineOrArea,
  Area,
  Bar,
  DodgeBar,
} from 'components/Charts';
import styles from './Inpatient.less';

@connect(({ inpatient, date, loading }) => ({
  inpatient,
  date,
  loading: loading.effects['inpatient/fetch'],
}))

export default class Inpatient extends Component {

  state = {
    rangeDateType: computeDays(this.props.date.report.beginDate, this.props.date.report.endDate) < 14 ? 'daily' : 'monthly',
    isOneDay: computeDays(this.props.date.report.beginDate, this.props.date.report.endDate) === 0,
    rangeDate: computeDays(this.props.date.report.beginDate, this.props.date.report.endDate),
  };

  componentDidMount() {
    const { date } = this.props;
    this.props.dispatch({
      type: 'inpatient/fetch',
      payload: {
        beginDate: date.report.beginDate,
        endDate: date.report.endDate,
      },
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'inpatient/clear',
    });
  }
 
  // [{date:……, x:1,y:2}]=>[{date:……, value:1,type:'x'}, {date:……, value:2,type:'y'}]
  changeData = (oldData,fields) =>{
    let newData = []
    oldData.forEach(element => {
      
      for (const key in element) {
        let newObj = {}
        if (element.hasOwnProperty(key)&& key !== 'date'&&(fields||[]).indexOf(key)<0) {
          newObj.type = key;
          newObj.value = element[key]
          newObj.date = element.date
          newData.push(newObj) 
        }
      }
     
    });
    return newData
  }

  switchTime=(length)=>{
    if(length<=31){
      return 1
    }
    if(length>31&&length<=90){
      return 3
    }
    if(length>90&&length<=180){
      return 6
    }
    if(length>180&&length<=270){
      return 9
    }
    if(length>270&&length<=365){
      return 12
    }
    if(length>365){
      return 30
    }
  }
  
  render() {
    const { rangeDateType, isOneDay, rangeDate } = this.state;
    const { inpatient, loading, date } = this.props;
    const {
      diffDepartStatisticInfoModule = [], // 不同科室本期入院、住院和出院人数
      dailyStatisticInfoModule = [],
    } = inpatient;

    let dailyStatisticInfoData = dailyStatisticInfoModule && transformArr(dailyStatisticInfoModule);
    const cardStyle = {
      padding: 0,
      marginBottom: 20,
      boxShadow: '0 0 4px 0 #E8E8E8',
    };
    return (
      <Fragment>
        <div style={{
          marginTop: '-10px',
          marginBottom: '10px',
          color: '#333',
        }}
        >
          {isOneDay ? date.report.beginDate : `${date.report.beginDate} --- ${date.report.endDate}`}
        </div>
        <Card
          loading={loading}
          title="本期不同科室入院和出院人数"
          bodyStyle={{ padding: '0 20px', minHeight: 420 }}
          style={cardStyle}
        >
          <LineOrArea
            height={400}
            line
            point
            data={diffDepartStatisticInfoModule}
            // titleMap={{
            //   x: 'date',
            //   y: 'type',
            //   filedsMap: {
            //     value: 'value',
            //   },
            // }}
            titleMap={{
              x: 'departName',
              filedsMap: { admissionCount: '入院人数', recoverCount: '出院人数' },
            }}
            lineColor={['#FEA101', '#CCCCCC']}
            xAxisRotate={30}
            grid={null}
          />
        </Card>
        <Card
          loading={loading}
          title="本期不同科室在院人次"
          bodyStyle={{ padding: '0 20px', minHeight: 420 }}
          style={cardStyle}
        >
          <LineOrArea
            height={400}
            area
            line
            point
            legend={false}
            data={diffDepartStatisticInfoModule}
            // titleMap={{
            //   x: 'date',
            //   y: 'type',
            //   filedsMap: {
            //     value: 'value',
            //   },
            // }}
            titleMap={{
              x: 'departName',
              filedsMap: { inHospitalCount: '在院人数' },
            }}
            areaColor={['l(270) 0:#FFF9EF 1:#FFDB9C']}
            lineColor={['#FEA101']}
            xAxisRotate={30}
            grid={null}
          />
        </Card>
        {rangeDateType === 'monthly' ? (
          <Card
            loading={loading}
            title="本期每天入院、出院人数"
            bodyStyle={{ padding: '0 20px', minHeight: 420 }}
            style={cardStyle}
          >
            {rangeDate > 31 ? (
              <LineOrArea
                area
                line
                // point
                legend
                shape="smooth"
                fillOpacity={[0.5, 0.2]}
                height={400}
                titleMap={{
                  x: 'date',
                  y: 'type',
                  filedsMap: {
                    value: 'value',
                  },
                }}
                opacity={0.6}
                xAxisRotate={30}
                data={this.changeData(dailyStatisticInfoData,'在院人次')}
                LegendSetting={{
                  name:'type'
                }}
                GeomConfig={{
                  line:{
                    color:['type', '#FEA101-#eaeaea'],
                    tooltip:['date*type*value', (date,type, value) => {
                      return {
                        name: type,
                        title: date,
                        value: value
                      };
                    }]
                  },
                  area:{
                    color:['type', '#FFDB9C-#eaeaea'],
                  },
                }}
                scale={{
                  date: {
                    type: 'cat',
                    tickCount: Math.ceil(dailyStatisticInfoData.length / this.switchTime(dailyStatisticInfoData.length)),
                    formatter: (text) => {
                      const prev = this[Symbol.for('lastDate')];
                      this[Symbol.for('lastDate')] = text;
                      const prevArr =prev&&prev.match(/\d+/g)||[];
                      const nowArr = text&&text.match(/\d+/g)||[];
                      if (dailyStatisticInfoData.length <= 365) {
                        if (prevArr[0] !== nowArr[0]) {
                          return `${nowArr[0]}年${nowArr[1]}月${nowArr[2]}日`;
                        }
                        if (prevArr[1] !==  nowArr[1]) {
                          return `${nowArr[1]}月${nowArr[2]}日`;
                        }
                        return `${nowArr[2]}日`;
                      } else{
                        if (prevArr[0] !== nowArr[0]) {
                          return `${nowArr[0]}年${nowArr[1]}月`;
                        }
                        return `${nowArr[1]}月`;
                      }
                    },
                  },
                }}
              />
            ) : (
              <Bar
                height={400}
                size={15}
                pbg={null}
                grid={null}
                label={false}
                color={['#FEA101', '#CCC']}
                fieldsMap={{
                  x: 'date',
                  keyMap: {
                    入院人数: '入院人数',
                    出院人数: '出院人数',
                  },
                }}
                keyLabelRotate={30}
                keyLabelTextAlign="start"
                data={dailyStatisticInfoData}
                chartSetting={
                  {
                    scale: {
                      date: {
                        type: 'cat',
                      },
                    },
                  }
                }
              />
            )}
          </Card>
        ) : null}
        {rangeDateType === 'monthly' ? (
          <Card
            loading={loading}
            title="本期每天在院人次"
            bodyStyle={{ padding: '0 20px', minHeight: 420 }}
            style={cardStyle}
          >
            <LineOrArea
              height={400}
              area
              line
              shape="smooth"
              legend={false}
              data={dailyStatisticInfoData}
              titleMap={{
                x: 'date',
                filedsMap: { 在院人次: '在院人次' },
              }}
              areaColor={['#FFDB9C']}
              lineColor={['#FEA101']}
              grid={null}
              xAxisRotate={30}
              scale={{
                date: {
                  type: 'cat',
                  tickCount: Math.ceil(dailyStatisticInfoData.length / this.switchTime(dailyStatisticInfoData.length)),
                  formatter: (text) => {
                    const prev = this[Symbol.for('lastDate')];
                    this[Symbol.for('lastDate')] = text;
                    const prevArr =prev&&prev.match(/\d+/g)||[];
                    const nowArr = text&&text.match(/\d+/g)||[];
                    if (dailyStatisticInfoData.length <= 365) {
                      if (prevArr[0] !== nowArr[0]) {
                        return `${nowArr[0]}年${nowArr[1]}月${nowArr[2]}日`;
                      }
                      if (prevArr[1] !==  nowArr[1]) {
                        return `${nowArr[1]}月${nowArr[2]}日`;
                      }
                      return `${nowArr[2]}日`;
                    } else{
                      if (prevArr[0] !== nowArr[0]) {
                        return `${nowArr[0]}年${nowArr[1]}月`;
                      }
                      return `${nowArr[1]}月`;
                    }
                  },
                },
              }}
              GeomConfig={{
                line:{
                  tooltip:['date*value', (date, value) => {
                    return {
                      name: '在院人次',
                      title: date,
                      value: value
                    };
                  }]
                },
              }}
            />
          </Card>
        ) : null}
      </Fragment>
    );
  }
}
