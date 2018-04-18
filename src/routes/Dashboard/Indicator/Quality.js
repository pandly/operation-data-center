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
    isOneDay: computeDays(this.props.date.indicator.beginDate, this.props.date.indicator.endDate) === 0 ? true : false
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

  render() {
    const { rangeDateType, isOneDay } = this.state;
    const { quality, loading, date } = this.props;
    let { 
      dailyStatisticInfoModule = [], 
      diffDepartStatisticInfoModule = [] 
    } = quality;

    const dailyStatisticInfoData = dailyStatisticInfoModule ? transformArr(dailyStatisticInfoModule).map(ele=>({...ele,...{date:ele.date.replace(/^(\d+).+?(\d+).+?(\d+).+$/,'$1-$2-$3')}})) : [];
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
            <Bar 
              height={400}
              size={15}
              pbg={null}
              label={false}
              color={['#FEA101','#CCC']}
              fieldsMap={{
                x: 'date',
                keyMap: {
                  '运行病历数': '运行病历数',
                  '按时完成病历数': '按时完成病历数'
                }
              }}
              chartSetting= {
                {
                  scale:{
                    date:{
                      type: 'cat'
                    }
                  }
                }
              }
              data={dailyStatisticInfoData} />
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
