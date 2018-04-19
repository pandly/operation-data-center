import React, { Component, Fragment } from 'react'
import { connect } from 'dva';
import Compare from '../../../components/Compare';
import { computeDays, getDateFromString, formatPercent, transformArr } from '../../../utils/utils';
import {
  Row,
  Col,
  Table,
  Tabs,
  Card
} from 'antd';
import {
  Bar,
  LineOrArea
} from 'components/Charts';
import styles from './Surgery.less';

const TabPane = Tabs.TabPane;

@connect(({ surgery, date, loading }) => ({
  surgery,
  date,
  loading: loading.effects['surgery/fetch'],
}))

export default class Surgery extends Component {
  
  state = {
    rangeDateType: computeDays(this.props.date.indicator.beginDate, this.props.date.indicator.endDate) < 14 ? 'daily' : 'monthly',
    rangeDate: computeDays(this.props.date.indicator.beginDate, this.props.date.indicator.endDate) + 1,
    isOneDay: computeDays(this.props.date.indicator.beginDate, this.props.date.indicator.endDate) === 0 ? true : false,
    category: 0,
    level: 1
  };
  
  dispatch = () => {
    const { date } = this.props
    this.props.dispatch({
      type: 'surgery/fetch',
      payload: {
        beginDate: date.indicator.beginDate,
        endDate: date.indicator.endDate,
        category: this.state.category,
        level: this.state.level
      }
    })
  };
  componentDidMount() {
    this.dispatch();
  }
  
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'surgery/clear',
    });
  }
  
  changeLevelTab = (activeKey) => {
    this.setState({level: activeKey}, () => {this.dispatch()});
  };

  changeTypeTab = (activeKey) => {
    this.setState({category: activeKey}, () => {this.dispatch()});
  };

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
    console.log(rangeDate)
    const { surgery, loading, date } = this.props;
    const { 
      diffCategorySurgeryModule = [], 
      diffLevelSurgeryModule = [] 
    } = surgery;
    
    const diffCategorySurgeryData = diffCategorySurgeryModule && transformArr(diffCategorySurgeryModule)
    const diffLevelSurgeryData = diffLevelSurgeryModule && transformArr(diffLevelSurgeryModule)
    
    const levelMap = [
      {
        key: 1,
        name: '一类'
      },
      {
        key: 2,
        name: '二类'
      },
      {
        key: 3,
        name: '三类'
      },
      {
        key: 4,
        name: '四类'
      },
      {
        key: 5,
        name: '特殊手术'
      },
      {
        key: 6,
        name: '检查操作'
      },
      {
        key: 7,
        name: '治疗操作'
      }
    ];
    const typeMap = [
      {
        key: 0,
        name: '择期'
      },
      {
        key: 1,
        name: '急诊'
      }
    ];
    let columns1 = [
      {
        title: '科室名称',
        dataIndex: 'departName',
        key: '1',
        width: 140
      }, 
      {
        title: '手术名称',
        dataIndex: 'surgeryName',
        key: '2',
        width: 200
      }, 
      {
        title: '手术例数',
        dataIndex: 'surgeryCount',
        key: '3',
        width: 110
      }, 
      {
        title: '手术级别',
        dataIndex: 'surgeryLevel',
        key: '4',
        width: 110,
        render: text => {
          return levelMap.filter(data => data.key == text)[0].name
        }
      },  
      {
        title: '手术例数环比数据',
        dataIndex: 'surgeryCountMom',
        key: '5',
        render: text => {
          return (
            <Compare value={text} />
          )  
        },
        width: 180
      }
    ];
    let columns2 = [
      {
        title: '科室名称',
        dataIndex: 'departName',
        key: '1',
        width: 140
      }, 
      {
        title: '手术名称',
        dataIndex: 'surgeryName',
        key: '2',
        width: 200
      }, 
      {
        title: '手术例数',
        dataIndex: 'surgeryCount',
        key: '3',
        width: 110
      }, 
      {
        title: '手术类型',
        dataIndex: 'surgeryType',
        key: '4',
        width: 110,
        render: text => {
          return typeMap.filter(data => data.key === text)[0].name
        }
      },  
      {
        title: '手术例数环比数据',
        dataIndex: 'surgeryCountMom',
        key: '5',
        render: text => {
          return (
            <Compare value={text} />
          )  
        },
        width: 180
      }
    ];

    const cardStyle = {
      boxShadow: "0 0 4px 0 #E8E8E8",
      marginBottom: 20
    }
    return (
      <Fragment>
        <div style={{
          marginTop: '-10px',
          marginBottom: '10px',
          color: '#333'
        }}>
          {isOneDay ? date.indicator.beginDate : `${date.indicator.beginDate} --- ${date.indicator.endDate}`}
        </div>
        {rangeDateType === 'daily' && (
          <div className="autoHeightCardWrap">
            <div className="autoHeightCard" style={{ marginRight: 20, width: '50%' }}>
              <div className="cardTitle">急诊、择期手术名称和例数</div>
              <Tabs 
                onChange={this.changeTypeTab} 
                type='card'
                style={{ zIndex: 2 }}>
                {typeMap.map(data => <TabPane tab={data.name} key={data.key}></TabPane>)}
              </Tabs>
              <div className="cardBody" style={{ padding: 0, top: 100 }}>
                <Table 
                  loading={loading}
                  dataSource={diffCategorySurgeryModule}
                  columns={columns1}
                  pagination={false}
                  scroll={{ y: true }}
                  rowClassName={(record, index) => 
                    index % 2 === 0 ? 'stripe' : ''
                  }
                />
              </div>
            </div>
            <div className="autoHeightCard" style={{ width: '50%' }}>
              <div className="cardTitle">不同级别手术名称和例数</div>
              <Tabs 
                onChange={this.changeLevelTab} 
                type='card' 
                style={{ zIndex: 2 }}>
                {levelMap.map(data => <TabPane tab={data.name} key={data.key}></TabPane>)}
              </Tabs>
              <div className="cardBody" style={{ padding: 0, top: 100 }}>
                <Table 
                  loading={loading}
                  dataSource={diffLevelSurgeryModule}
                  columns={columns2}
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
        {rangeDateType === 'monthly' && (
          <Card
            loading={loading}
            title="本期每天不同类别手术例数"
            bodyStyle={{ padding: '0 20px', minHeight: 420 }}
            style={cardStyle}
          >
            {
              rangeDate <= 31 ?
              <Bar 
                height={400}
                size={22}
                color={['#FEA101', '#3AC9A8']}
                data={diffCategorySurgeryData} 
                fieldsMap={{
                  x: 'date', 
                  keyMap: {
                    '择期手术':'择期手术',
                    '急诊手术':'急诊手术',
                  }
                }}
                dodge={-1}
                keyLabelRotate={30}
                label={false}
                keyLabelTextAlign='start'
                chartSetting= {
                  {
                    scale:{
                      date:{
                        type: 'cat',
                        tickCount: Math.ceil(diffLevelSurgeryData.length / this.switchTime(diffLevelSurgeryData.length)),
                        formatter: (text) => {
                          const prev = this[Symbol.for('lastDate')];
                          this[Symbol.for('lastDate')] = text;
                          const prevArr =prev&&prev.match(/\d+/g)||[];
                          const nowArr = text&&text.match(/\d+/g)||[];
                          if (diffLevelSurgeryData.length <= 365) {
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
                      }
                    }
                  }
                }
              />
              : <LineOrArea
              area
              line
              legend
              shape={'smooth'}
              lineColor={['#FEA101', '#3AC9A8']}
              height={400}
              opacity={0.6}
              titleMap={{
                x: 'date',
                filedsMap: {
                  '择期手术':'择期手术',
                  '急诊手术':'急诊手术',
                },
              }}
              titleMap={{
                x: 'date',
                y: 'type',
                filedsMap: {
                  value: 'value',
                },
              }}
              xAxisRotate={30}
              data={this.changeData(diffCategorySurgeryData)} 
              LegendSetting={{
                name:'type'
              }}
              GeomConfig={{
                line:{
                  color:['type', '#FEA101-#3AC9A8'],
                  tooltip:['date*type*value', (date,type, value) => {
                    return {
                      name: type,
                      title: date,
                      value: value
                    };
                  }]
                },
                area:{
                  color:['type', '#FEA101-#3AC9A8'],
                },
              }}
              scale={{
                date: {
                  type: 'cat',
                  tickCount: Math.ceil(diffLevelSurgeryData.length / this.switchTime(diffLevelSurgeryData.length)),
                  formatter: (text) => {
                    const prev = this[Symbol.for('lastDate')];
                    this[Symbol.for('lastDate')] = text;
                    const prevArr =prev&&prev.match(/\d+/g)||[];
                    const nowArr = text&&text.match(/\d+/g)||[];
                    if (diffLevelSurgeryData.length <= 365) {
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

            }
          </Card>
        )}
        {rangeDateType === 'monthly' && (
          <Card
            loading={loading}
            title="本期每天不同级别手术例数"
            bodyStyle={{ padding: '0 20px', minHeight: 420 }}
            style={cardStyle}
          >
            <LineOrArea
              area
              line
              legend
              shape={'smooth'}
              lineColor={['#53BDE7', '#FF8465', '#FEA101', '#3AC9A8', '#1E439B', '#4D7BF3', '#FECD01']}
              height={400}
              opacity={0.6}
              titleMap={{
                x: 'date',
                filedsMap: {
                  '一类手术': '一类手术',
                  '二类手术': '二类手术',
                  '三类手术': '三类手术',
                  '四类手术': '四类手术',
                  '特殊手术': '特殊手术',
                  '检查操作': '检查操作',
                  '治疗操作': '治疗操作'
                },
              }}
              titleMap={{
                x: 'date',
                y: 'type',
                filedsMap: {
                  value: 'value',
                },
              }}
              xAxisRotate={30}
              data={this.changeData(diffLevelSurgeryData)} 
              LegendSetting={{
                name:'type'
              }}
              GeomConfig={{
                line:{
                  color:['type', '#53BDE7-#FF8465-#FEA101-#3AC9A8-#1E439B-#4D7BF3-#FECD01'],
                  tooltip:['date*type*value', (date,type, value) => {
                    return {
                      name: type,
                      title: date,
                      value: value
                    };
                  }]
                },
                area:{
                  color:['type', '#53BDE7-#FF8465-#FEA101-#3AC9A8-#1E439B-#4D7BF3-#FECD01'],
                },
              }}
              scale={{
                date: {
                  type: 'cat',
                  tickCount: Math.ceil(diffLevelSurgeryData.length / this.switchTime(diffLevelSurgeryData.length)),
                  formatter: (text) => {
                    const prev = this[Symbol.for('lastDate')];
                    this[Symbol.for('lastDate')] = text;
                    const prevArr =prev&&prev.match(/\d+/g)||[];
                    const nowArr = text&&text.match(/\d+/g)||[];
                    if (diffLevelSurgeryData.length <= 365) {
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
          </Card>
        )}
      </Fragment>
    )
  }
}
