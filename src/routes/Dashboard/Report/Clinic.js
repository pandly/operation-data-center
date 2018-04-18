import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { computeDays, transformArr, formatPercent } from '../../../utils/utils';
import {
  Row,
  Col,
  Card,
} from 'antd';
import {
  Bar,
  LineOrArea,
} from 'components/Charts';
import styles from './Clinic.less';

@connect(({ clinic, date, loading }) => ({
  clinic,
  date,
  loading: loading.effects['clinic/fetch'],
}))

export default class Clinic extends Component {

  state = {
    rangeDateType: computeDays(this.props.date.report.beginDate, this.props.date.report.endDate) < 14 ? 'daily' : 'monthly',
    isOneDay: computeDays(this.props.date.report.beginDate, this.props.date.report.endDate) === 0,
  };

  componentDidMount() {
    const { date } = this.props;
    this.props.dispatch({
      type: 'clinic/fetch',
      payload: {
        beginDate: date.report.beginDate,
        endDate: date.report.endDate,
      },
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'clinic/clear',
    });
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
    const { clinic, loading, date } = this.props;
    let {
      surgricalSlice = [], // 外科片
      outpatientSlice = [], // 门诊片
      internalSlice = [], // 内科片
      otherSlice = [], // 不参与考核科室的门急诊人次
      dailyOutpatientEmergencyInfo = {}, // 本期每天门急诊人次
      registrationStatistic = [], // 不同挂号类别数量
      outpatientEmergencyStatistic = [], // 门急诊单项统计
    } = clinic;

    let dailyOutpatientEmergencyData = [];
    if (dailyOutpatientEmergencyInfo) {
      dailyOutpatientEmergencyInfo.name = '门急诊人次';
      dailyOutpatientEmergencyData = transformArr([dailyOutpatientEmergencyInfo]);
    }

    registrationStatistic = registrationStatistic || {};
    const registrationStatisticData = [
      {
        item: '普通号',
        count: registrationStatistic.ordinaryRegistration,
      },
      {
        item: '专家号',
        count: registrationStatistic.expertRegistration,
      },
      {
        item: '特需',
        count: registrationStatistic.specialRegistration,
      },
      {
        item: '专科',
        count: registrationStatistic.specialistRegistration,
      },
    ];
    outpatientEmergencyStatistic = outpatientEmergencyStatistic || {};
    const outpatientEmergencyStatisticData = [
      {
        item: '门诊人次',
        count: outpatientEmergencyStatistic.outpatientCount,
      },
      {
        item: '门诊退号人次',
        count: outpatientEmergencyStatistic.registeredReturn,
      },
      {
        item: '门急诊复诊人数',
        count: outpatientEmergencyStatistic.referral,
      },
      {
        item: '体检人数',
        count: outpatientEmergencyStatistic.medicalExamination,
      },
      {
        item: '门诊免费人次(含义诊)',
        count: outpatientEmergencyStatistic.freeDiagnosis,
      },
      {
        item: '急诊人次',
        count: outpatientEmergencyStatistic.emergencyCount,
      },
      {
        item: '门诊退号率',
        count: typeof outpatientEmergencyStatistic.registeredReturnRate === 'number' ? formatPercent(outpatientEmergencyStatistic.registeredReturnRate) : '--',
      },
      {
        item: '门急诊复诊率',
        count: typeof outpatientEmergencyStatistic.referralRate === 'number' ? formatPercent(outpatientEmergencyStatistic.referralRate) : '--',
      },
      {
        item: '门急诊医保人数',
        count: outpatientEmergencyStatistic.medicalInsurance,
      },
      {
        item: '门诊免费人次比例',
        count: typeof outpatientEmergencyStatistic.freeDiagnosisRate === 'number' ? formatPercent(outpatientEmergencyStatistic.freeDiagnosisRate) : '--',
      },
    ];
    const topColResponsiveProps = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 24,
      xl: 8,
    };
    const cardStyle = {
      marginBottom: 20,
      boxShadow: '0 0 4px 0 #E8E8E8',
    };
    const cardBody = {
      padding: '0 12px 0 12px',
      minHeight: 570,
    };
    const fieldsMap = { key: 'departName', value: 'outEmerRegCount' };
    return (
      <Fragment>
        <div style={{
          marginTop: '-10px',
          marginBottom: '10px',
          color: '#333',
        }}
        >
          {isOneDay ? date.report.beginDate : `${date.report.beginDate} --- ${date.report.endDate}`}
        </div>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <Card
              loading={loading}
              title="门诊片"
              bodyStyle={cardBody}
              style={cardStyle}
            >
              <Bar
                height={293}
                size={10}
                color="#3AC9A8"
                transpose
                axisLine={null}
                pbg={{
                  stroke: '#e8e8e8',
                  lineWidth: 1,
                }}
                fieldsMap={{
                  x: 'departName',
                  keyMap: { outEmerRegCount: '门急诊人次' },
                }}
                legend={false}
                data={outpatientSlice}
                shapeTypes={['borderRadius', 'baseLine']}
                labelSetting={{
                  htmlTemplate: (text, item, index) => `<div
                     style='transform: translate(-35%, 60%);
                        color:#3AC9A8;
                        textAlign: center;
                        fontSize: 12px;
                        verticalAlign:middle
                    '>${text} </div>`,
                }}
                keyLabelTextAlign="start"
                />
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card
              loading={loading}
              title="外科片"
              bodyStyle={cardBody}
              style={cardStyle}
            >
              <Bar
                height={550}
                size={10}
                color="#FEA101"
                transpose
                axisLine={null}
                pbg={{
                  stroke: '#e8e8e8',
                  lineWidth: 1,
                }}
                fieldsMap={{
                  x: 'departName',
                  keyMap: { outEmerRegCount: '门急诊人次' },
                }}
                legend={false}
                data={surgricalSlice}
                shapeTypes={['borderRadius', 'baseLine']}
                labelSetting={{
                  htmlTemplate: (text, item, index) => `<div
                     style='transform: translate(-35%, 60%);
                        color:#FEA101;
                        textAlign: center;
                        fontSize: 12px;
                        verticalAlign:middle
                    '>${text} </div>`,
                }}
                keyLabelTextAlign="start"
                />
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card
              loading={loading}
              title="内科片"
              bodyStyle={cardBody}
              style={cardStyle}
            >
              <Bar
                height={550}
                size={10}
                color="#53BDE7"
                transpose
                axisLine={null}
                pbg={{
                  stroke: '#e8e8e8',
                  lineWidth: 1,
                }}
                fieldsMap={{
                  x: 'departName',
                  keyMap: { outEmerRegCount: '门急诊人次' },
                }}
                legend={false}
                data={internalSlice}
                shapeTypes={['borderRadius', 'baseLine']}
                labelSetting={{
                    htmlTemplate: (text, item, index) => `<div
                     style='transform: translate(-35%, 60%);
                        color:#53BDE7;
                        textAlign: center;
                        fontSize: 12px;
                        verticalAlign:middle
                    '>${text} </div>`,
                }}
                keyLabelTextAlign="start"
                />
            </Card>
          </Col>
        </Row>
        <Card
          loading={loading}
          title="不参与考核科室的门急诊人次"
          bodyStyle={{ padding: '0 20px', minHeight: 380 }}
          style={cardStyle}
        >
          <Bar
            height={350}
            size={25}
            color="#FF8465"
            fieldsMap={{
              x: 'departName',
              keyMap: { outEmerRegCount: '门急诊人次' },
            }}
            legend={false}
            data={otherSlice}
          />
        </Card>
        {rangeDateType === 'monthly' && (
          <Card
            loading={loading}
            title="本期每天门急诊人次"
            bodyStyle={{ padding: '0 20px', minHeight: 420 }}
            style={cardStyle}
          >
            <LineOrArea
              area
              line
              shape="smooth"
              areaColor={['#C5EFE5']}
              lineColor={['#3AC9A8']}
              opacity={0.5}
              height={400}
              legend={false}
              titleMap={{
                x: 'date',
                filedsMap: {
                  门急诊人次: '门急诊人次',
                },
              }}
              xAxisRotate={30}
              data={dailyOutpatientEmergencyData}
              scale={{
                date: {
                  type: 'cat',
                  tickCount: Math.ceil(dailyOutpatientEmergencyData.length / this.switchTime(dailyOutpatientEmergencyData.length)),
                  formatter: (text) => {
                    const prev = this[Symbol.for('lastDate')];
                    this[Symbol.for('lastDate')] = text;
                    const prevArr =prev&&prev.match(/\d+/g)||[];
                    const nowArr = text.match(/\d+/g)||[];
                    if (dailyOutpatientEmergencyData.length <= 365) {
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
              GeomConfig={{
                area:{
                  tooltip:[`date*value`, (time, sold) => {
                    return {
                      name: '门急诊人次',
                      title: time,
                      value: sold
                    };
                  }]
                }
              }}
            />
          </Card>
        )}
        <Row gutter={24}>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              title="不同挂号类别数量"
              bodyStyle={{
                padding: '0 20px',
                position: 'relative',
                minHeight: 250,
              }}
              style={cardStyle}
            >
              {registrationStatisticData.map((data) => {
                return (
                  <div className={styles.registeringWrap} key={data.item}>
                    <div className={`${styles.registeringType} ${styles.registering}`}>{data.item}</div>
                    <div className={`${styles.registeringNum} ${styles.registering}`}>{data.count}</div>
                  </div>
                );
              })}
              <div className={styles.horizontal} />
              <div className={styles.vertical} />
            </Card>
          </Col>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              title="门急诊单项统计"
              bodyStyle={{ padding: '0 10px', minHeight: 250 }}
              style={cardStyle}
            >
              {outpatientEmergencyStatisticData.map((data) => {
                return (
                  <div className={styles.wrapCard} key={data.item}>
                    <Card
                      className={styles.countCard}
                      bodyStyle={{
                        padding: '12px 0',
                        height: '95px',
                      }}
                    >
                      <div className={styles.itemPart}>{data.item}</div>
                      <div className={styles.countPart}>{data.count || '--'}</div>
                    </Card>
                  </div>
                );
              })}
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
