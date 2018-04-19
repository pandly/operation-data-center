import React, { Component, Fragment } from 'react'
import { connect } from 'dva';
import Compare from '../../../components/Compare';
import { computeDays, getDateFromString, formatPercent, transformArr } from '../../../utils/utils';
import {
  Row,
  Col,
  Card,
  Table
} from 'antd';
import {
  Bar,
  LineOrArea
} from 'components/Charts';
import styles from './Quality.less';

@connect(({ quality, date, loading }) => ({
  quality,
  date,
  loading: loading.effects['quality/fetch'],
}))

export default class Quality extends Component { 
  
  state = {
    rangeDateType: computeDays(this.props.date.indicator.beginDate, this.props.date.indicator.endDate) < 14 ? 'daily' : 'monthly',
    isOneDay: computeDays(this.props.date.indicator.beginDate, this.props.date.indicator.endDate) === 0 ? true : false,
    rangeDate: computeDays(this.props.date.indicator.beginDate, this.props.date.indicator.endDate) + 1,
  };

  componentDidMount() {
    const { date } = this.props;
    this.props.dispatch({
      type: 'quality/fetch',
      payload: {
        beginDate: date.indicator.beginDate,
        endDate: date.indicator.endDate
      }
    })
  }
  
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'quality/clear',
    });
  }
  
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
    const { quality, loading, date } = this.props;
    let { 
      dailyStatisticInfoModule = [], 
      diffDepartStatisticInfoModule = [] 
    } = quality;

    const dailyStatisticInfoData = dailyStatisticInfoModule && transformArr(dailyStatisticInfoModule);
    const cardStyle = {
      padding: 0,
      marginBottom: 20,
      boxShadow: "0 0 4px 0 #E8E8E8"
    }

    const columns = [
      {
        title: '科室名称',
        dataIndex: 'departmentName',
        key: '1',
        width: 180
      }, 
      {
        title: '按时完成病历数',
        dataIndex: 'completeMedicalRecords',
        key: '2',
        width: 150
      }, 
      {
        title: '运行病历数',
        dataIndex: 'totalMedicalRecords',
        key: '3',
        width: 100
      },   
      {
        title: '完成率',
        dataIndex: 'completeRecordsRate',
        key: '4',
        render: text => {
          return formatPercent(text)
        },
        width: 100
      },
      {
        title: '完成率环比数据',
        dataIndex: 'completeRecordsRateMom',
        key: '5',
        render: text => {
          return <Compare value={text} />
        },
        width: 200
      },
    ];
    return (
      <Fragment>
        <div style={{
          marginTop: '-10px',
          marginBottom: '10px',
          color: '#333'
        }}>
          {isOneDay ? date.indicator.beginDate : `${date.indicator.beginDate} --- ${date.indicator.endDate}`}
        </div>
        {rangeDateType === 'monthly' && (
          <Card
            loading={loading}
            title="本期每天按时完成病历数和运行病历数"
            style={cardStyle}
            bodyStyle={{ 
              minHeight: 270, 
              padding: '0 10px 20px 20px',
            }}>
            {rangeDate > 31 ? (
              <LineOrArea
                area
                line
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
                    运行病历数: '运行病历数',
                    按时完成病历数: '按时完成病历数',
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
                    },
                  }
                }
                GeomSetting={
                  {tooltip: ['date*key*value', (date,key, value) => {
                    return {
                      name: key,
                      title: date,
                      value: value
                    };
                  }]}
                }
              />
            )}
          </Card>
        )}
        {rangeDateType === 'monthly' && (
          <Card
            loading={loading}
            title="本期不同科室按时完成病历数和运行病历数"
            style={cardStyle}
            bodyStyle={{ 
              minHeight: 270, 
              padding: '0 10px 20px 20px',
            }}> 
            <LineOrArea
              line
              point
              legend
              lineColor={['#FEA101', '#CCC']}
              height={400}
              titleMap={{
                x: 'departName',
                filedsMap: {
                  'totalRecordsCount': '运行病历数',
                  'completeRecordsCount': '按时完成病历数',
                },
              }}
              xAxisRotate={30}
              data={diffDepartStatisticInfoModule} />
          </Card>
        )}
        {rangeDateType === 'daily' && (
          <div className="autoHeightCardWrap">
            <div className="autoHeightCard" style={{ width: '100%' }}>
              <div className="cardTitle">不同科室运行病历按时完成率</div>
              <div className="cardBody" style={{ padding: 0 }}>
                <Table 
                  loading={loading}
                  dataSource={diffDepartStatisticInfoModule}
                  columns={columns}
                  pagination={false}
                  scroll={{ y: true }}
                  rowClassName={(record, index) => 
                    index % 2 === 0 ? 'stripe' : ''
                  }
                />
              </div>
            </div>
          </div> 
        )}         
      </Fragment>
    )
  }
}
