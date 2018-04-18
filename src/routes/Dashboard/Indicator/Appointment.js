import React, { Component, Fragment } from 'react'
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Table,
  Divider
} from 'antd';
import {
  LineOrArea,
  Bar
} from 'components/Charts';
import styles from './Appointment.less';
import { computeDays, yuan, formatPercent, transformArr } from '../../../utils/utils';

@connect(({ appointment, date, loading }) => ({
  appointment,
  date,
  loading: loading.effects['appointment/fetch'],
}))

export default class Appointment extends Component {
  
  state = {
    rangeDateType: computeDays(this.props.date.indicator.beginDate, this.props.date.indicator.endDate) < 14 ? 'daily' : 'monthly',
    isOneDay: computeDays(this.props.date.indicator.beginDate, this.props.date.indicator.endDate) === 0 ? true : false
  };

  componentDidMount() {
    const { date } = this.props;
    this.props.dispatch({
      type: 'appointment/fetch',
      payload: {
        beginDate: date.indicator.beginDate,
        endDate: date.indicator.endDate
      }
    })
  }
  
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'appointment/clear',
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
    const { rangeDateType, isOneDay } = this.state;
    const { appointment, loading, date } = this.props;

    let { 
      diffWayReservationRegistrationModule = [],
      diffDepartReservationVisitsRateModule = [],
      reservationVisitsInfoModule = [] 
    } = appointment;
    
    const reservationVisitsData = reservationVisitsInfoModule ? transformArr(reservationVisitsInfoModule).map(ele=>({...ele,...{date:ele.date.replace(/^(\d+).+?(\d+).+?(\d+).+$/,'$1-$2-$3')}})) : []; 

    //不同途径普通号和专家号人数
    let columns = [
      {
        title: '科室名称',
        dataIndex: 'departName',
        key: '1'
      }, 
      // {
      //   title: '普通号预约数',
      //   dataIndex: 'ordinaryReservation',
      //   key: '2'
      // }, 
      {
        title: '专家号预约数',
        dataIndex: 'expertReservation',
        key: '3'
      }, 
      {
        title: '特需预约数',
        dataIndex: 'specialNeedReservation',
        key: '4'
      },  
      {
        title: '专科预约数',
        dataIndex: 'specialRegistReservation',
        key: '5'
      },
      {
        title: '总预约数',
        dataIndex: 'totalReservationCount',
        key: '6'
      },
      {
        title: '总预约就诊数',
        dataIndex: 'totalVisitCount',
        key: '7',
      },
      // {
      //   title: '普通号预约就诊率',
      //   dataIndex: 'ordinaryVisitRate',
      //   key: '8',
      //   render: text => {
      //     return formatPercent(text);
      //   },
      // },
      {
        title: '专家号预约就诊率',
        dataIndex: 'expertVisitRate',
        key: '9',
        render: text => {
          return formatPercent(text);
        },
      },
      {
        title: '特需预约就诊率',
        dataIndex: 'specialNeedVisitRate',
        key: '10',
        render: text => {
          return formatPercent(text);
        },
      },
      {
        title: '专科预约就诊率',
        dataIndex: 'specialRegistVisitRate',
        key: '11',
        render: text => {
          return formatPercent(text);
        },
      }
    ];
    const cardStyle = {
      marginBottom: 20,
      boxShadow: "0 0 4px 0 #E8E8E8"
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
          <Card
            loading={loading}
            title="本期不同途径预约人数"
            style={cardStyle}
            bodyStyle={{ 
              minHeight: 270, 
              padding: '0 10px 20px 20px',
            }}> 
            <Bar 
              height={293}
              size={25} 
              color={['#53BDE7', '#FF8465', '#3AC9A8', '#FEA101']}
              axisKeyLine={null}
              fieldsMap={{
                x: 'reservationChannel', 
                keyMap: {
                  //'ordinaryReservation': '普通号',
                  'expertReservation': '专家号',
                  'specialRegistReservation': '专科',
                  'specialNeedReservation': '特需'     
                }
              }}
              data={diffWayReservationRegistrationModule} />
          </Card>
          {rangeDateType === 'monthly'&&(
            <Card
              loading={loading}
              title="本期每天不同号源的预约人数"
              style={cardStyle}
              bodyStyle={{ 
                minHeight: 270, 
                padding: '0 10px 20px 20px',
              }}> 
              <LineOrArea
                line
                area
                legend
                lineColor={['#53BDE7', '#FF8465', '#3AC9A8', '#FEA101']}
                height={400}
                opacity={0.6}
                titleMap={{
                  x: 'date',
                  y: 'type',
                  filedsMap: {
                    value: 'value',
                  },
                }}
                xAxisRotate={30}
                data={this.changeData(reservationVisitsData,['普通号'])} 
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
                    color:['type', '#53BDE7-#FF8465-#3AC9A8-#FEA101'],
                  },
                }}
                scale={{
                  date: {
                    type: 'cat',
                    tickCount: Math.ceil(reservationVisitsData.length / this.switchTime(reservationVisitsData.length)),
                    formatter: (text) => {
                      const prev = this[Symbol.for('lastDate')];
                      this[Symbol.for('lastDate')] = text;
                      const prevArr =prev&&prev.match(/\d+/g)||[];
                      const nowArr = text&&text.match(/\d+/g)||[];
                      if (reservationVisitsData.length <= 365) {
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
          <Card
            loading={loading}
            title="本期不同科室预约数量和预约就诊率"
            bodyStyle={{ padding: 0 }}
            style={{ marginBottom: 24 }}>
            <Table 
              loading={loading}
              dataSource={diffDepartReservationVisitsRateModule}
              columns={columns}
              pagination={false}
              rowClassName={(record, index) => 
                index % 2 === 0 ? 'stripe' : ''
              }
            />
          </Card>  
      </Fragment>
    )
  }
}
