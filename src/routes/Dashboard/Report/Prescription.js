import React, { Component, Fragment } from 'react'
import { connect } from 'dva';
import Compare from '../../../components/Compare';
import { computeDays, yuan, formatPercent } from '../../../utils/utils';
import {
  Row,
  Col,
  Card,
  Table,
  Divider
} from 'antd';
import {
  Bar,
} from 'components/Charts';
import styles from './Prescription.less';

@connect(({ prescription, date, loading }) => ({
  prescription,
  date,
  loading: loading.effects['prescription/fetch'],
}))

export default class Prescription extends Component {
  
  state = {
    rangeDateType: computeDays(this.props.date.report.beginDate, this.props.date.report.endDate) < 14 ? 'daily' : 'monthly',
    isOneDay: computeDays(this.props.date.report.beginDate, this.props.date.report.endDate) === 0 ? true : false
  };

  componentDidMount() {
    const { date } = this.props;
    this.props.dispatch({
      type: 'prescription/fetch',
      payload: {
        beginDate: date.report.beginDate,
        endDate: date.report.endDate
      }
    })
  }
  
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'prescription/clear',
    });
  }

  render() {
    const { rangeDateType, isOneDay } = this.state;
    const { prescription, loading, date } = this.props;
    const { 
      departmentPrescriptionInfo = [], 
      prescriptionSingleStatisticInfo = [] 
    } = prescription;
    
    const [
      prescriptionTotalIncome = {}, //处方总金额
      maxOtherChargeAmount = {}, //其他最大处方金额
      perHumanPrescriptionIncome = {}, //人均处方金额
      prescriptionAvgIncome = {}, //平均处方金额
      maxSelfChargeAmount = {}, //自费最大处方金额
      antibacterialPrescriptionRate = {}, //门诊患者抗菌药处方比例
    ] = prescriptionSingleStatisticInfo;

    const prescriptionSingleData = [
      {
        item: '门诊患者抗菌药处方比例',
        count: formatPercent(antibacterialPrescriptionRate.antibacterialPrescriptionRate),
        decrease: antibacterialPrescriptionRate.antibacterialPrescriptionRateMom
      },
      {
        item: '处方总金额',
        count: yuan(prescriptionTotalIncome.prescriptionTotalIncome),
        decrease: prescriptionTotalIncome.prescriptionTotalIncomeMom
      },
      {
        item: '人均处方金额',
        count: yuan(perHumanPrescriptionIncome.perHumanPrescriptionIncome),
        decrease: perHumanPrescriptionIncome.perHumanPrescriptionIncomeMom
      },
      {
        item: '平均处方金额',
        count: yuan(prescriptionAvgIncome.prescriptionAvgIncome),
        decrease: prescriptionAvgIncome.prescriptionAvgIncomeMom
      },
      {
        item: '自费最大处方金额',
        count: yuan(maxSelfChargeAmount.maxSelfChargeAmount),
        decrease: maxSelfChargeAmount.maxSelfChargeAmountMom
      },
      {
        item: '其他最大处方金额',
        count: yuan(maxOtherChargeAmount.maxOtherChargeAmount),
        decrease: maxOtherChargeAmount.maxOtherChargeAmountMom
      }
    ];
    let columns = [
      {
        title: '科室名称',
        dataIndex: 'departName',
        key: 'departName',
        width: 200
      }, 
      {
        title: '处方数量',
        dataIndex: 'prescriptionQuantity',
        key: 'prescriptionQuantity',
        width: 150
      }, 
      {
        title: '中医处方数量',
        dataIndex: 'chinaPrescriptionQuantity',
        key: 'chinaPrescriptionQuantity',
        width: 150
      }, 
      {
        title: '中医处方率',
        dataIndex: 'chinaPrescriptionRate',
        key: 'chinaPrescriptionRate',
        render: text => {
          return formatPercent(text);
        },
        width: 150
      },  
      {
        title: '成药比',
        dataIndex: 'chinaPatentMedicineQuantityRate',
        key: 'chinaPatentMedicineQuantityRate',
        render: text => {
          return formatPercent(text);
        },
        width: 150
      },
      {
        title: '门诊饮片处方比',
        dataIndex: 'piecesPrescriptionQuantityRate',
        key: 'piecesPrescriptionQuantityRate',
        render: text => {
          return formatPercent(text);
        },
        width: 150
      }, 
      {
        title: '门诊饮片人次比',
        dataIndex: 'piecesPrescriptionHumanRate',
        key: 'piecesPrescriptionHumanRate',
        render: text => {
          return formatPercent(text);
        },
        width: 150
      }, 
      {
        title: '出院饮片人次比',
        dataIndex: 'dischargedPiecesRate',
        key: 'dischargedPiecesRate',
        render: text => {
          return formatPercent(text);
        },
        width: 150
      }
    ];
    if(rangeDateType === 'monthly') {
      const columnObject =  {
        title: '中医处方率环比数据',
        dataIndex: 'chinaPrescriptionRateMom',
        key: 'chinaPrescriptionRateMom',
        render: text => {
          return (
            <Compare value={text} />
          )  
        },
        width: 180
      }
      columns.splice(4, 0, columnObject);
    }
    const cardStyle = {
      height: '100%',
      width: '30%',
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
          <div className="autoHeightCard" style={{ marginRight: 20, width: '70%' }}>
            <div className="cardTitle">不同科室所开处方数量</div>
            <div className="cardBody" style={{ padding: 0 }}>
              <Table 
                loading={loading}
                dataSource={departmentPrescriptionInfo}
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
            title={rangeDateType === 'monthly' ? '处方单向统计和环比数据' : '处方单向统计'}
            bodyStyle={{ 
              padding: '0 20px', 
              flex: 1, 
              overflowY: 'auto' 
            }}
            style={cardStyle}
          >
            {prescriptionSingleData.map(data => {
              return (
                rangeDateType === 'monthly' ? (
                  <Card
                    key={data.item}
                    className={styles.countCard}
                    style={{ marginBottom: 20 }}
                    bodyStyle={{ 
                      height: '100px',
                      padding: '10px'
                    }}
                  >  
                    <div style={{ color: '#666', marginBottom: 14 }}>{data.item}</div> 
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ fontSize: '24px', flex: 2, textAlign: 'right', paddingRight: 22 }}>{data.count || '--'}</div>
                      <Divider type="vertical" style={{ height: 20 }}/>
                      <div style={{ flex: 1, textAlign: 'left', paddingLeft: 17 }}>
                        <Compare value={data.decrease} />
                      </div>
                    </div>                                 
                  </Card>
                ) : (
                  <Card
                    key={data.item}
                    className={styles.countCard}
                    style={{ marginBottom: 20 }}
                    bodyStyle={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center', 
                      height: '100px',
                      padding: '24px 40px'
                    }}
                  >  
                    <div style={{ fontSize: '24px' }}>{data.count || '--'}</div>                   
                    <div>{data.item || '--'}</div>               
                  </Card>
                )
              )
            })}
          </Card>  
        </div>
      </Fragment>
    )
  }
}
