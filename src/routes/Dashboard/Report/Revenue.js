import React, { Component, Fragment } from 'react'
import { connect } from 'dva';
import Compare from '../../../components/Compare';
import NoData from '../../../components/NoData';
import {
  Row,
  Col,
  Card,
  Table,
} from 'antd';
import {
  Pie
} from 'components/Charts';
import styles from './Revenue.less';
import { computeDays, yuan, formatPercent } from '../../../utils/utils';

@connect(({ income, date, loading }) => ({
  income,
  date,
  loading: loading.effects['income/fetch'],
}))

export default class Revenue extends Component {
  
  state = {
    rangeDateType: computeDays(this.props.date.report.beginDate, this.props.date.report.endDate) < 14 ? 'daily' : 'monthly',
    isOneDay: computeDays(this.props.date.report.beginDate, this.props.date.report.endDate) === 0 ? true : false
  };

  componentDidMount() {
    const { date } = this.props;
    this.props.dispatch({
      type: 'income/fetch',
      payload: {
        beginDate: date.report.beginDate,
        endDate: date.report.endDate
      }
    })
  }
  
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'income/clear',
    });
  }

  render() {
    const { rangeDateType, isOneDay } = this.state;
    const { income, loading, date } = this.props;

    let { 
      baseStatisticModule = [],
      diffDepartIncomeModule = [],
      drugIncomeDetailsModule = {}, 
      nonDrugIncomeDetailsModule = [], 
    } = income;
    console.log(drugIncomeDetailsModule)
    let [
      fourExpenses = {},
      drugCost = {},
      medicalServiceIncomeCount = {}, 
      medicalInsuranceIncomeCount = {},
      diseasesNumber = {},
      sanitaryCostsCount = {},
      outEmerIncomeCount = {},
      drugIncomeCount = {},
      checkLaboratoryIncomeCount = {},
      medicalIncomeCount = {}
    ] = baseStatisticModule;
    const incomeDetailData = [
      {
        item: '四项比',
        count: formatPercent(fourExpenses.fourExpensesRate),
        mom: fourExpenses.fourExpensesRateMom
      },
      {
        item: '卫生材料费用',
        count: yuan(sanitaryCostsCount.sanitaryCostsCount),
        mom: sanitaryCostsCount.sanitaryCostsCountMom
      },
      {
        item: '门急诊收入(不含体检)',
        count: yuan(outEmerIncomeCount.outEmerIncomeCount),
        mom: outEmerIncomeCount.outEmerIncomeCountMom
      },
      {
        item: '药品收入(不含中药饮片)',
        count: yuan(drugIncomeCount.drugIncomeCount),
        mom: drugIncomeCount.drugIncomeCountMom
      },
      {
        item: '医保收入',
        count: yuan(medicalInsuranceIncomeCount.medicalInsuranceIncomeCount),
        mom: medicalInsuranceIncomeCount.medicalInsuranceIncomeCountMom
      },
      {
        item: '药品比(无饮)',
        count: formatPercent(drugCost.drugCostsRate),
        mom: drugCost.drugCostsRateMom
      },
      {
        item: '检查化验收入',
        count: yuan(checkLaboratoryIncomeCount.checkLaboratoryIncomeCount),
        mom: checkLaboratoryIncomeCount.checkLaboratoryIncomeCountMom
      },
      {
        item: '医疗服务收入(不含药品、卫生材料、检查化验)',
        count: yuan(medicalServiceIncomeCount.medicalServiceIncomeCount),
        mom: medicalServiceIncomeCount.medicalServiceIncomeCountMom
      },
      {
        item: '医疗收入(不含药品)',
        count: yuan(medicalIncomeCount.medicalIncomeCount),
        mom: medicalIncomeCount.medicalIncomeCountMom
      },
      {
        item: '按病种收费的病种数',
        count: diseasesNumber.diseasesNumber,
        mom: diseasesNumber.diseasesNumberMom
      }
    ]
    //不同科室的收入明细--列表数据
    let deptColumn = [
      {
        title: '科室名称',
        dataIndex: 'departName',
        key: '1',
        width: 160
      }, 
      {
        title: '门急诊收入',
        dataIndex: 'outEmerIncomeCount',
        key: '2',
        sorter: (a, b) => (a.outEmerIncomeCount || 0) - (b.outEmerIncomeCount || 0),
        render: text => {
          return yuan(text)
        }
      }, 
      {
        title: '住院收入',
        dataIndex: 'inHospitalIncomeCount',
        key: '3',
        sorter: (a, b) => (a.inHospitalIncomeCount || 0) - (b.inHospitalIncomeCount || 0),
        render: text => {
          return yuan(text)
        }
      }, 
      {
        title: '总收入',
        dataIndex: 'totalIncomeCount',
        key: '4',
        sorter: (a, b) => (a.totalIncomeCount || 0) - (b.totalIncomeCount || 0),
        render: text => {
          return yuan(text)
        }
      }, 
    ];
    const deptMonthlyObj = rangeDateType === 'monthly' ? {
      title: '总收入环比数据',
      dataIndex: 'totalIncomeCountMom',
      key: '5',
      sorter: (a, b) => (a.totalIncomeCountMom || 0) - (b.totalIncomeCountMom || 0),
      render: text => {
        return (
          <Compare value={text} />
        )  
      }
    } : {
      title: '所占比例',
      dataIndex: 'totalIncomeRate',
      key: '5',
      sorter: (a, b) => (a.totalIncomeRate || 0) - (b.totalIncomeRate || 0),
      render: text => {
        return formatPercent(text)
      },
    }
    deptColumn.push(deptMonthlyObj)
    //非药品收入明细--列表数据
    let drugColumn = [
      {
        title: '收入类别',
        dataIndex: 'incomeType',
        key: '6',
      }, 
      {
        title: '收入金额',
        dataIndex: 'incomeCount',
        key: '7',
        sorter: (a, b) => (a.incomeCount || 0) - (b.incomeCount || 0),
        render: text => {
          return yuan(text)
        },
      }, 
    ];
    const drugMonthlyObj = rangeDateType === 'monthly' ? {
      title: '收入金额环比数据',
      dataIndex: 'incomeCountMom',
      key: '8',
      sorter: (a, b) => (a.incomeCountMom || 0) - (b.incomeCountMom || 0),
      render: text => {
        return (
          <Compare value={text} />
        )  
      },
    } : {
      title: '所占比例',
      dataIndex: 'incomeCountRate',
      key: '8',
      sorter: (a, b) => (a.incomeCountRate || 0) - (b.incomeCountRate || 0),
      render: text => {
        return formatPercent(text)
      },
    }
    drugColumn.push(drugMonthlyObj)

    //药品收入明细--饼状图数据
    const pieData = [
      {
        item: '中成药',
        count: drugIncomeDetailsModule.chinesePatientMedicineCount
      },
      {
        item: '中草药',
        count: drugIncomeDetailsModule.herbsCount
      },
      {
        item: '西药',
        count: drugIncomeDetailsModule.westernMedicineCount
      },
    ]
    return (
      <Fragment>
        <div style={{
          marginTop: '-10px',
          marginBottom: '10px',
          color: '#333'
        }}>
          {isOneDay ? date.report.beginDate : `${date.report.beginDate} --- ${date.report.endDate}`}
        </div>
        <Row gutter={24}>
          {incomeDetailData.map((data, index, arr) => {
            return (
              <div className={styles.wrapCard} key={data.item}>
                <Card
                  loading={loading}
                  className={styles.countCard}
                  bodyStyle={{ 
                    padding: '18px 0 0 0', 
                    //height: '100px',                  
                  }}> 
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflow: 'hidden'
                  }}> 
                    <div className={styles.countPart}>{ data.count == undefined ? '--' : data.count }</div>                   
                    {data.item.includes('(') ? (
                      <div className={styles.itemPart}>
                        <div>{data.item.slice(0, data.item.indexOf('('))}</div>
                        <div style={{ fontSize: 12 }}>{data.item.slice(data.item.indexOf('('))}</div>
                      </div>
                    ) : (
                      <div className={styles.itemPart}>{data.item}</div> 
                    )}
                    {rangeDateType === 'monthly' && (
                      <div className={styles.compare}>
                        {index !== (arr.length - 1) ? (
                          <Compare value={data.mom} />
                        ) : (
                          <Compare value={null} />
                        )}
                      </div>
                    )}
                  </div>       
                </Card>
              </div>
            )    
          })}
        </Row>
        <Row gutter={24}>
          <Col xl={14} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              title="不同科室的收入明细"
              bodyStyle={{ padding: 0, minHeight: 438 }}
              style={{ marginBottom: 24 }}
            >
              <Table
                dataSource={diffDepartIncomeModule}
                columns={deptColumn}
                pagination={false}
                rowClassName={(record, index) => 
                  index % 2 === 0 ? 'stripe' : ''
                }
              />
            </Card>
          </Col>
          <Col xl={10} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              title="药品收入明细"
              bodyStyle={{ minHeight: 200, padding: '0 20px' }}
              style={{ marginBottom: 20 }}>
              {drugIncomeDetailsModule ? 
                (
                  <Pie
                    hasLegend = 'all'
                    legendWidth={250}
                    //hasLabel
                    innerRadius={0.6}
                    data={pieData}
                    valueFormat={val => yuan(val)}
                    height={160}
                    lineWidth={2}
                    colors={['#3AC9A8', '#53BDE7', '#FF8465']}
                  />
                ) : (<NoData />)
              }       
            </Card>
            <Card
              loading={loading}
              title="非药品收入明细"
              bodyStyle={{ padding: 0 }}
              style={{ marginBottom: 20 }}
            >
                <Table 
                  dataSource={nonDrugIncomeDetailsModule}
                  columns={drugColumn}
                  pagination={false}
                  rowClassName={(record, index) => 
                    index % 2 === 0 ? 'stripe' : ''
                  }
                />
            </Card>
          </Col>
        </Row>
      </Fragment>
    )
  }
}
