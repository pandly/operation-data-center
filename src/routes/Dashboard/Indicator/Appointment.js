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

  render() {
    const { rangeDateType, isOneDay } = this.state;
    const { appointment, loading, date } = this.props;

    let { 
      diffWayReservationRegistrationModule = [],
      diffDepartReservationVisitsRateModule = [],
      reservationVisitsInfoModule = [] 
    } = appointment;
    
    const reservationVisitsData = reservationVisitsInfoModule ? transformArr(reservationVisitsInfoModule) : []; 

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
            title="不同途径预约人数"
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
                point
                legend
                lineColor={['#53BDE7', '#FF8465', '#3AC9A8', '#FEA101']}
                height={400}
                titleMap={{
                  x: 'date',
                  filedsMap: {
                    '专家号': '专家号',
                    '专科': '专科',
                    //'普通号': '普通号',
                    '特需': '特需'
                  },
                }}
                xAxisRotate={30}
                data={reservationVisitsData} />
            </Card>
          )}
          <Card
            loading={loading}
            title="不同科室预约数量和预约就诊率"
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
