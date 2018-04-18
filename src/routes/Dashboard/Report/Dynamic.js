import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Card,
  DatePicker,
  Divider
} from 'antd';
import {
  Pie,
} from 'components/Charts';
import DailyCard from '../../../components/CountCard/DailyCard';
import MonthlyCard from '../../../components/CountCard/MonthlyCard';
import Compare from '../../../components/Compare';
import { getRangePickerValue, computeDays, yuan, formatPercent } from '../../../utils/utils';

import styles from './Dynamic.less';

const { RangePicker } = DatePicker;

@connect(({ dynamic, date, loading }) => ({
  dynamic,
  date,
  loading: loading.effects['dynamic/fetch'],
}))

export default class Dynamic extends PureComponent {

  state = {
    rangePickerValue: getRangePickerValue(this.props.date.report),
    rangeDateType: computeDays(this.props.date.report.beginDate, this.props.date.report.endDate) < 14 ? 'daily' : 'monthly',
  };
 
  componentDidMount() {
    const { date } = this.props;
    this.props.dispatch({
      type: 'dynamic/fetch',
      payload: {
        beginDate: date.report.beginDate,
        endDate: date.report.endDate
      }
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dynamic/clear',
    });
  }
  
  handleCardClick = (num) => {
    let params, title;
    switch(num) {
      case 0: 
        params = 'clinic';
        title = '总门急诊人次';
        break;
      case 1: 
        params = 'prescription';
        title = '中医处方数量';
        break;
      case 2: 
        params = 'nonDrug';
        title = '非药物中治率';
        break;
      case 3: 
        params = 'inpatient';
        title = '出院人数';
        break;
      case 4: 
        params = 'revenue';
        title = '收入';
        break;  
    }
    let path = {
      pathname: `/dashboard/report/${params}`,
      search: this.props.location.search
    };
    const payload = {
      title,
      key: path.pathname,
      content: ''
    }
    this.props.dispatch({
      type: 'tab/update',
      payload
    })
    this.props.dispatch(routerRedux.push(path));
  };
  
  handleRangePickerChange = (rangePickerValue, dateStr) => {
    if(dateStr[0] === ''){
      return;
    }
    const days = computeDays(dateStr[0], dateStr[1]);   
    this.setState({
        rangeDateType: days < 14 ? 'daily' : 'monthly',
        rangePickerValue
      }); 
    this.props.dispatch({
      type: 'dynamic/fetch',
      payload: {
        beginDate: dateStr[0],
        endDate: dateStr[1]
      }
    });
    this.props.dispatch({
      type: 'date/update',
      payload: {
        report: {
          beginDate: dateStr[0],
          endDate: dateStr[1]
        }
      }
    })
  };
  disabledDate = (current) => {
    let currentDate = new Date().toLocaleDateString() + ' 08:00:00';
    // can not select days after today
    return current.valueOf() >= new Date(currentDate).valueOf();
  };
  render() {
    const { rangePickerValue, rangeDateType } = this.state;
    const { dynamic, loading } = this.props;
    const {
      patientBurdenModule = [], //患者负担模块
      totalEmergencyVisitsModule = {} , //总门急诊人次
      chinaPrescriptionsModule = {}, //中医处方数量
      nondrugTreatmentRateModule = {}, //非药物中治率(门诊)
      inHospitalModule = [], //在院模块
      totalIncomeModule = [], //收入模块
    } = dynamic;
    
    const [
      recover = {}, //出院人数
      admissions = {}, //入院人数
      inHospital = {} //在院人数
    ] = inHospitalModule;
    const inHospitalData = [
      {
        item: '出院人数',
        count: recover.recover,
        increase: recover.recoverYoy,
        decrease: recover.recoverMom
      },
      {
        item: '入院人数',
        count: admissions.admissions,
        increase: admissions.admissionsYoy,
        decrease: admissions.admissionsMom
      },
      {
        item: '在院人次',
        count: inHospital.inHospital,
        increase: inHospital.inHospitalYoy,
        decrease: inHospital.inHospitalMom
      }
    ]

    const [
      inHospitalIncome = {}, //住院收入
      drugIncome = {}, //药品收入
      outpatientEmergencyIncome = {}, //门急诊收入
      totalIncome = {}, //总收入
      nonDrugIncome = {} //非药品收入
    ] = totalIncomeModule;
    const pieData = [
      {
        item: '住院收入',
        count: inHospitalIncome.inHospitalIncome
      },
      {
        item: '门急诊收入',
        count: outpatientEmergencyIncome.outpatientEmergencyIncome
      },
      {
        item: '非药品收入',
        count: nonDrugIncome.nonDrugIncome
      },
      {
        item: '药品收入',
        count: drugIncome.drugIncome
      },
    ]

    const [
      perOutpatientTreatFees = {}, //门诊人均诊疗费用
      perMedicalExaminationFees = {}, //每体检人次费用
      perPrescriptionFees = {}, //人均处方金额
      perDaysOfRecover = {}, //出院患者平均住院日
      perRecoverDrugFees = {}, //出院病人人均药品费用
      perOutpatientEmergencyFees = {}, //门急诊均次费用
      perOutpatientDrugFees = {},  //门诊人均药品费用
      perInHospitalFees = {}, //住院均次费用
    ] = patientBurdenModule
    const burdenData = [
      {
        item: '门急诊均次费用',
        count: yuan(perOutpatientEmergencyFees.perOutpatientEmergencyFees),
        decrease: perOutpatientEmergencyFees.perOutpatientEmergencyFeesMom
      },
      {
        item: '门诊人次药品费用',
        count: yuan(perOutpatientDrugFees.perOutpatientDrugFees),
        decrease: perOutpatientDrugFees.perOutpatientDrugFeesMom
      },
      {
        item: '门诊人次中药费用',
        count: yuan(perOutpatientTreatFees.perOutpatientTreatFees),
        decrease: perOutpatientTreatFees.perOutpatientTreatFeesMom
      },
      {
        item: '平均处方金额',
        count: yuan(perPrescriptionFees.perPrescriptionFees),
        decrease: perPrescriptionFees.perPrescriptionFeesMom
      },
      {
        item: '住院均次费用',
        count: yuan(perInHospitalFees.perInHospitalFees),
        decrease: perInHospitalFees.perInHospitalFeesMom
      },
      {
        item: '出院病人人均药品费用',
        count: yuan(perRecoverDrugFees.perRecoverDrugFees),
        decrease: perRecoverDrugFees.perRecoverDrugFeesMom
      },
      {
        item: '每体检人次费用',
        count: yuan(perMedicalExaminationFees.perMedicalExaminationFees),
        decrease: perMedicalExaminationFees.perMedicalExaminationFeesMom
      },
    ]
    if(rangeDateType === 'monthly') {
      burdenData.splice(5, 0, {
        item: '出院患者平均住院日',
        count: perDaysOfRecover.perDaysOfRecover,
        decrease: perDaysOfRecover.perDaysOfRecoverMom
      })
    }
    const cardStyle = {
      marginBottom: 20,
      boxShadow: "0 0 4px 0 #E8E8E8"
    }

    const pieStyle = {
      margin: '40px 0',
      paddingRight: 10,
      paddingLeft: 90,
    }
    return (
      <Fragment>
        <Card
          style={cardStyle}
          bodyStyle={{ padding: 20 }}>
          <span style={{ color: '#333', fontWeight: '500' }}>选择日期：</span>
          <RangePicker
            value={rangePickerValue}
            onChange={this.handleRangePickerChange}
            disabledDate={this.disabledDate}
            style={{ width: 256 }}
          />
        </Card>

        <Row gutter={24}>
          <Col xl={5} lg={8} md={24} sm={24} xs={24}>
            {rangeDateType === 'daily' ? (
              <DailyCard
                loading={loading}
                iconName="icon-menjizhenrenci"             
                color="#3AC9A8"
                title="总门急诊人次"
                content={totalEmergencyVisitsModule.totalEmergencyVisits}
                onCardClick={() => this.handleCardClick(0)}
              />
            ) : (
              <MonthlyCard
                loading={loading}          
                color="#3AC9A8"
                title="总门急诊人次"
                content={totalEmergencyVisitsModule.totalEmergencyVisits}
                increase={totalEmergencyVisitsModule.totalEmergencyVisitsYoy}
                decrease={totalEmergencyVisitsModule.totalEmergencyVisitsMom}
                onCardClick={() => this.handleCardClick(0)}
              />
            )}           
          </Col>
          <Col xl={5} lg={8} md={24} sm={24} xs={24}>
            {rangeDateType === 'daily' ? (
              <DailyCard
                loading={loading}
                iconName="icon-zhongyi"             
                color="#53BDE7"
                title="中医处方数量"
                content={chinaPrescriptionsModule.chinaPrescriptions}
                onCardClick={() => this.handleCardClick(1)}
              />
            ) : (
              <MonthlyCard
                loading={loading}          
                color="#53BDE7"
                title="中医处方数量"
                content={chinaPrescriptionsModule.chinaPrescriptions}
                increase={chinaPrescriptionsModule.chinaPrescriptionsYoy}
                decrease={chinaPrescriptionsModule.chinaPrescriptionsMom}
                onCardClick={() => this.handleCardClick(1)}
              />
            )}         
          </Col>
          <Col xl={5} lg={8} md={24} sm={24} xs={24}>
            {rangeDateType === 'daily' ? (
              <DailyCard
                loading={loading}
                iconName="icon-feiyaowu"             
                color="#FF8465"
                title="非药物中治率(门诊)"
                content={nondrugTreatmentRateModule.nondrugTreatmentRate ? formatPercent(nondrugTreatmentRateModule.nondrugTreatmentRate).replace('%','')-0 : '--'}
                unit="%"
                onCardClick={() => this.handleCardClick(2)}
              />
            ) : (
              <MonthlyCard
                loading={loading}          
                color="#FF8465"
                title="非药物中治率(门诊)"
                content={nondrugTreatmentRateModule.nondrugTreatmentRate ? formatPercent(nondrugTreatmentRateModule.nondrugTreatmentRate).replace('%','')-0 : '--'}
                increase={nondrugTreatmentRateModule.nondrugTreatmentRateYoy}
                decrease={nondrugTreatmentRateModule.nondrugTreatmentRateMom}
                unit="%"
                onCardClick={() => this.handleCardClick(2)}
              />
            )}          
          </Col>
          <Col xl={9} lg={24} md={24} sm={24} xs={24}>
            {rangeDateType === 'daily' ? (
              <Card
                loading={loading}
                style={cardStyle}
                hoverable
                onClick={() => this.handleCardClick(3)}
              >
                <div style={{ display: 'flex', fontSize: '16px', position: 'relative' }}>
                  {inHospitalData.map(data => {
                    return (
                      <div style={{ flex: 1, textAlign: 'center' }} key={data.item}>
                        <div>{data.item}</div>
                        <div style={{ color: '#FEA101', fontSize: '36px' }}>{data.count || '--'}</div>
                      </div>                    
                    )
                  })}
                  <div className={styles.vertical} style={{ left: '33.33%' }}></div>
                  <div className={styles.vertical} style={{ right: '33.33%' }}></div>               
                </div>
              </Card>
            ) : (
              <Card
                loading={loading}
                style={cardStyle}
                bodyStyle={{ padding: 0, height: 200 }}
                hoverable
                onClick={() => this.handleCardClick(3)}
              >
                <div className={styles.monthlyInpatientCardTitle}>住院</div>
                <div className={styles.monthlyInpatientCardContent}>
                  {inHospitalData.map(data => {
                    return (
                      <div className={styles.part} key={data.item}>
                        <div className={styles.partOne}>{data.item}</div>
                        <div className={styles.partTwo}>{data.count || '--'}</div>
                        <div className={styles.partThree}>
                          <div>
                            <Compare type="同比" value={data.increase} />             
                          </div>
                          <div>
                            <Compare type="环比" value={data.decrease} />
                          </div>
                        </div>  
                      </div>
                    )                 
                  })}
                  <div className={styles.vertical} style={{ left: '33.33%' }}></div>
                  <div className={styles.vertical} style={{ right: '33.33%' }}></div>               
                </div>
              </Card>
            )}           
          </Col>         
        </Row>

        <Row gutter={24}>
          <Col xl={13} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              title={
                <i className="icon-shouru" style={{
                  color: '#ffe300',
                }}>  <span style={{ color: '#333', marginLeft: 5 }}>总收入</span></i>
              }
              hoverable
              style={cardStyle}
              
              bodyStyle={{ minHeight: 555, padding: 0 }}
              onClick={() => this.handleCardClick(4)}
            >
              <div className={styles.wrapPrice}>
                <div className={styles.price}>{yuan(totalIncome.totalIncome) || '--'}</div>
                {rangeDateType === 'monthly' ? (
                  <div className={styles.compare}>
                    <Compare type="同比" value={totalIncome.totalIncomeYoy} />
                    <Divider type="vertical" />
                    <Compare type="环比" value={totalIncome.totalIncomeMom} />
                  </div>
                ) : null}          
              </div>
              <Pie
                hasLegend='title'
                hasLabel
                data={pieData.slice(0,2)}
                valueFormat={val => yuan(val)}
                height={160}
                lineWidth={2}
                style={pieStyle}
                colors={['#53BDE7', '#3AC9A8']}
              />
              <Pie
                hasLegend='title'
                hasLabel
                data={pieData.slice(2)}
                valueFormat={val => yuan(val)}
                height={160}
                lineWidth={2}
                style={pieStyle}
                colors={['#FF8465', '#FEA101']}
              />
            </Card>
          </Col>
          <Col xl={11} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              title="患者负担"
              bodyStyle={{ minHeight: 555, padding: '0 10px' }}
              style={cardStyle}
            >
              {burdenData.map(item => {
                return (
                  <div className={styles.wrapCard} key={item.item} style={ rangeDateType === 'monthly' ? {width: '33.33%'} : {width: '50%'} }>
                    <Card
                      className={styles.burdenCard}
                      bodyStyle={{ padding: '8px 0 10px 0' }}
                    >
                      <div className={styles.item}>{item.item}</div>
                      <div className={styles.count}>{item.count || '--'}</div>
                      {rangeDateType === 'monthly' && (
                        <div className={styles.compare}>
                          <Compare type="环比" value={item.decrease} />
                        </div>
                      )}  
                    </Card>
                  </div>
                )
              })}
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
