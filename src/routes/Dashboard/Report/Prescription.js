import React, { Component, Fragment } from 'react'
import { connect } from 'dva';
import Compare from '../../../components/Compare';
import { yuan, formatPercent } from '../../../utils/utils';
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
    rangeDateType: this.props.date.report.rangeDateType,
    isOneDay: this.props.date.report.isOneDay
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
  
  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
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
        width: 150
      }, 
      {
        title: '处方数量',
        dataIndex: 'prescriptionQuantity',
        key: 'prescriptionQuantity',
        width: 130,
        sorter: (a, b) => (a.prescriptionQuantity || 0) - (b.prescriptionQuantity || 0)
      }, 
      {
        title: '中医处方数量',
        dataIndex: 'chinaPrescriptionQuantity',
        key: 'chinaPrescriptionQuantity',
        width: 160,
        sorter: (a, b) => (a.chinaPrescriptionQuantity || 0) - (b.chinaPrescriptionQuantity || 0)
      }, 
      {
        title: '中医处方率',
        dataIndex: 'chinaPrescriptionRate',
        key: 'chinaPrescriptionRate',
        sorter: (a, b) => (a.chinaPrescriptionRate || 0) - (b.chinaPrescriptionRate || 0),
        render: text => {
          return formatPercent(text);
        },
        width: 150
      },  
      {
        title: '成药比',
        dataIndex: 'chinaPatentMedicineQuantityRate',
        key: 'chinaPatentMedicineQuantityRate',
        sorter: (a, b) => (a.chinaPatentMedicineQuantityRate || 0) - (b.chinaPatentMedicineQuantityRate || 0),
        render: text => {
          return formatPercent(text);
        },
        width: 160
      },
      {
        title: '门诊饮片处方比',
        dataIndex: 'piecesPrescriptionQuantityRate',
        key: 'piecesPrescriptionQuantityRate',
        sorter: (a, b) => (a.piecesPrescriptionQuantityRate || 0) - (b.piecesPrescriptionQuantityRate || 0),
        render: text => {
          return formatPercent(text);
        },
        width: 160
      }, 
      {
        title: '门诊饮片人次比',
        dataIndex: 'piecesPrescriptionHumanRate',
        key: 'piecesPrescriptionHumanRate',
        sorter: (a, b) => (a.piecesPrescriptionHumanRate || 0) - (b.piecesPrescriptionHumanRate || 0),
        render: text => {
          return formatPercent(text);
        },
        width: 160
      }, 
      {
        title: '出院饮片人次比',
        dataIndex: 'dischargedPiecesRate',
        key: 'dischargedPiecesRate',
        sorter: (a, b) => (a.dischargedPiecesRate || 0) - (b.dischargedPiecesRate || 0),
        render: text => {
          return formatPercent(text);
        },
        width: 160
      }
    ];
    if(rangeDateType === 'monthly') {
      const columnObject =  {
        title: '中医处方率环比数据',
        dataIndex: 'chinaPrescriptionRateMom',
        key: 'chinaPrescriptionRateMom',
        sorter: (a, b) => (a.chinaPrescriptionRateMom || 0) - (b.chinaPrescriptionRateMom || 0),
        render: text => {
          return (
            <Compare value={text} />
          )  
        },
        width: 180
      }
      columns.splice(4, 0, columnObject);
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
                onChange={this.onChange}
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
            style={{
              height: '100%',
              width: '30%',
              boxShadow: "0 0 4px 0 #E8E8E8",
              display: 'flex',
              flexDirection: 'column'
            }}>
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
                      <div style={{ fontSize: '24px', flex: 2, textAlign: 'right', paddingRight: 14 }}>{data.count || '--'}</div>
                      <Divider type="vertical" style={{ height: 20 }}/>
                      <div style={{ flex: 1, textAlign: 'left', paddingLeft: 10 }}>
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
                      padding: '0 20px'
                    }}>  
                    <div style={{ fontSize: '24px' }}>{data.count}</div>                   
                    <div>{data.item}</div>               
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
