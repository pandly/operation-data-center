import React, { Component, Fragment } from 'react'
import { connect } from 'dva';
import Compare from '../../../components/Compare';
import { formatPercent } from '../../../utils/utils';
import {
  Row,
  Col,
  Card,
  Table,
  Icon,
  Divider
} from 'antd';
import {
  Bar,
} from 'components/Charts';
import styles from './NonDrug.less';

@connect(({ nonDrug, date, loading }) => ({
  nonDrug,
  date,
  loading: loading.effects['nonDrug/fetch'],
}))

export default class NonDrug extends Component {
  
  state = {
    rangeDateType: this.props.date.report.rangeDateType,
    isOneDay: this.props.date.report.isOneDay
  };

  componentDidMount() {
    const { date } = this.props;
    this.props.dispatch({
      type: 'nonDrug/fetch',
      payload: {
        beginDate: date.report.beginDate,
        endDate: date.report.endDate
      }
    })
  }
  
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'nonDrug/clear',
    });
  }

  render() {
    const { rangeDateType, isOneDay } = this.state;
    const { nonDrug, loading, date } = this.props;
    const {
      diffDepartNonDrugModule = [],
      topTenTherapyModule = []
    } = nonDrug;
    
    let columns = [
      {
        title: '科室名称',
        dataIndex: 'departName',
        key: 'departName',
        width: 140
      }, 
      {
        title: '门诊非药物中医诊疗人次',
        dataIndex: 'patientNonDrugCount',
        key: 'patientNonDrugCount',
        sorter: (a, b) => (a.patientNonDrugCount || 0) - (b.patientNonDrugCount || 0),
        width: 180
      }, 
      {
        title: '门诊非药物中治率',
        dataIndex: 'patientNonDrugCountRate',
        key: 'patientNonDrugCountRate',
        sorter: (a, b) => (a.patientNonDrugCountRate || 0) - (b.patientNonDrugCountRate || 0),
        render: text => {
          return formatPercent(text)
        },
        width: 140
      },   
      {
        title: '出院非药物中医诊疗人次',
        dataIndex: 'recoverNonDrugCount',
        key: 'recoverNonDrugCount',
        sorter: (a, b) => (a.recoverNonDrugCount || 0) - (b.recoverNonDrugCount || 0),
        width: 180
      },
      {
        title: '出院非药物中治率',
        dataIndex: 'recoverNonDrugRate',
        key: 'recoverNonDrugRate',
        sorter: (a, b) => (a.recoverNonDrugRate || 0) - (b.recoverNonDrugRate || 0),
        render: text => {
          return formatPercent(text)
        },
        width: 140
      },
    ];
    if(rangeDateType === 'monthly') {
      const columnObject1 = {
        title: '门诊非药物中治率环比数据',
        dataIndex: 'patientNonDrugCountRateMom',
        key: 'patientNonDrugCountRateMom',
        sorter: (a, b) => (a.patientNonDrugCountRateMom || 0) - (b.patientNonDrugCountRateMom || 0),
        render: text => {
          return (
            <Compare value={text} />
          )  
        },
        width: 200
      }
      const columnObject2 = {
        title: '出院非药物中治率环比数据',
        dataIndex: 'recoverNonDrugRateMom',
        key: 'recoverNonDrugRateMom',
        sorter: (a, b) => (a.recoverNonDrugRateMom || 0) - (b.recoverNonDrugRateMom || 0),
        render: text => {
          return (
            <Compare value={text} />
          )  
        },
        width: 200
      }
      columns.splice(3,0,columnObject1);
      columns.splice(7,0,columnObject2)
    }
    const cardStyle = {
      height: '100%',
      width: '40%',
      boxShadow: "0 0 4px 0 #E8E8E8",
      display: 'flex',
      flexDirection: 'column'
    }
    return (
      <Fragment>
        <div style={{
          marginTop: '-10px',
          marginBottom: '10px',
          color: '#333'
        }}>
          {isOneDay ? date.report.beginDate : `${date.report.beginDate} --- ${date.report.endDate}`}
        </div>
        <div className="autoHeightCardWrap">
          <div className="autoHeightCard" style={{ marginRight: 20, width: '60%' }}>
            <div className="cardTitle">不同科室非药物中治疗率</div>
            <div className="cardBody" style={{ padding: 0 }}>
              <Table 
                loading={loading}
                dataSource={diffDepartNonDrugModule}
                columns={columns}
                pagination={false}
                scroll={{ y: true }}
                rowClassName={(record, index) => 
                  index % 2 === 0 ? 'stripe' : ''
                }
              />
            </div>
          </div>
          <Card
            loading={loading}
            title={rangeDateType === 'monthly' ? '非药物中治最多的前十疗法、次数和环比数据' : '非药物中治最多的前十疗法和次数'}
            bodyStyle={{ 
              padding: '0 10px', 
              flex: 1, 
              overflowY: 'auto' 
            }}
            style={cardStyle}
          >
            <div className={styles.columnRank}>
              {topTenTherapyModule.map((data, index) => {
                return (
                  rangeDateType === 'monthly' ? (
                    <div className={styles.wrapCard} key={data.therapyName}>
                      <Card
                        className={`${styles.countCard} ${styles.monthlyCard}`}
                        bodyStyle={{ 
                          height: '125px',
                          padding: '15px'
                        }}> 
                        {[0, 1, 2].includes(index) ? (
                          <div className={`${styles.arrow} ${index === 0 ? styles.one : (index === 1 ? styles.two : styles.three)}`} >
                            <span className={styles.num}>{index + 1}</span>
                          </div>
                        ) : (
                          <div className={styles.square} >
                            {index + 1}
                          </div>
                        )}                        
                        <div className={styles.part1}>{data.therapyName}</div> 
                        <div className={styles.part2}>                    
                          <div className={styles.left}>{data.frequency == undefined ? '--' : data.frequency}</div>
                          <Divider type="vertical" style={{ height: 20 }}/>
                          <div className={styles.right}>
                             <Compare value={data.frequencyMom} />
                          </div>
                        </div>                                                      
                      </Card>
                    </div>
                  ) : (
                    <div className={styles.wrapCard} key={data.therapyName}>
                      <Card
                        className={`${styles.countCard} ${styles.dailyCard}`}
                        bodyStyle={{ 
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center', 
                          height: '125px'
                        }}> 
                        {[0, 1, 2].includes(index) ? (
                          <div className={`${styles.arrow} ${index === 0 ? styles.one : (index === 1 ? styles.two : styles.three)}`} >
                            <span className={styles.num}>{index + 1}</span>
                          </div>
                        ) : (
                          <div className={styles.square} >
                            {index + 1}
                          </div>
                        )}                        
                        <div className={styles.part1}>{data.therapyName}</div>                     
                        <div className={styles.part2}>{data.frequency == undefined ? '--' : data.frequency}</div>                                                        
                      </Card>
                    </div>
                  )               
                )
              })}
            </div>
          </Card>  
        </div>
      </Fragment>
    )
  }
}
