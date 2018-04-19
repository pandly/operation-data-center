import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { computeDays, transformArr } from '../../../utils/utils';
import {
  Row,
  Col,
  Card,
  Icon,
} from 'antd';
import {
  LineOrArea,
  Area,
  Bar,
  DodgeBar,
} from 'components/Charts';
import styles from './Inpatient.less';

@connect(({ inpatient, date, loading }) => ({
  inpatient,
  date,
  loading: loading.effects['inpatient/fetch'],
}))

export default class Inpatient extends Component {

  state = {
    rangeDateType: computeDays(this.props.date.report.beginDate, this.props.date.report.endDate) < 14 ? 'daily' : 'monthly',
    isOneDay: computeDays(this.props.date.report.beginDate, this.props.date.report.endDate) === 0,
    rangeDate: computeDays(this.props.date.report.beginDate, this.props.date.report.endDate),
  };

  componentDidMount() {
    const { date } = this.props;
    this.props.dispatch({
      type: 'inpatient/fetch',
      payload: {
        beginDate: date.report.beginDate,
        endDate: date.report.endDate,
      },
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'inpatient/clear',
    });
  }

  render() {
    const { rangeDateType, isOneDay, rangeDate } = this.state;
    const { inpatient, loading, date } = this.props;
    const {
      diffDepartStatisticInfoModule = [], // 不同科室本期入院、住院和出院人数
      dailyStatisticInfoModule = [],
    } = inpatient;

    const dailyStatisticInfoData = dailyStatisticInfoModule && transformArr(dailyStatisticInfoModule).map(ele => ({ ...ele, ...{ date: ele.date.replace(/^(\d+).+?(\d+).+?(\d+).+$/, '$1-$2-$3') } }));
    const cardStyle = {
      padding: 0,
      marginBottom: 20,
      boxShadow: '0 0 4px 0 #E8E8E8',
    };
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
        <Card
          loading={loading}
          title="本期不同科室入院和出院人数"
          bodyStyle={{ padding: '0 20px', minHeight: 420 }}
          style={cardStyle}
        >
          <LineOrArea
            height={400}
            line
            point
            data={diffDepartStatisticInfoModule}
            titleMap={{
              x: 'departName',
              filedsMap: { admissionCount: '入院人数', recoverCount: '出院人数' },
            }}
            lineColor={['#FEA101', '#CCCCCC']}
            xAxisRotate={30}
            grid={null}
          />
        </Card>
        <Card
          loading={loading}
          title="本期不同科室在院人次"
          bodyStyle={{ padding: '0 20px', minHeight: 420 }}
          style={cardStyle}
        >
          <LineOrArea
            height={400}
            area
            line
            point
            legend={false}
            data={diffDepartStatisticInfoModule}
            titleMap={{
              x: 'departName',
              filedsMap: { inHospitalCount: '在院人数' },
            }}
            areaColor={['l(270) 0:#FFF9EF 1:#FFDB9C']}
            lineColor={['#FEA101']}
            xAxisRotate={30}
            grid={null}
          />
        </Card>
        {rangeDateType === 'monthly' ? (
          <Card
            loading={loading}
            title="本期每天入院、出院人数"
            bodyStyle={{ padding: '0 20px', minHeight: 420 }}
            style={cardStyle}
          >
            {rangeDate > 31 ? (
              <LineOrArea
                // area
                line
                point
                legend={false}
                // shape="smooth"
                areaColor={['#FFDB9C', '#CCC']}
                lineColor={['#FEA101', '#CCC']}
                fillOpacity={[0.5, 0.2]}
                height={400}
                titleMap={{
                  x: 'date',
                  filedsMap: {
                    入院人数: '入院人数',
                    出院人数: '出院人数',
                  },
                }}
                xAxisRotate={30}
                data={dailyStatisticInfoData}
              />
            ) : (
              <Bar
                height={400}
                size={15}
                pbg={null}
                grid={null}
                label={false}
                color={['#FEA101', '#CCC']}
                fieldsMap={{
                  x: 'date',
                  keyMap: {
                    入院人数: '入院人数',
                    出院人数: '出院人数',
                  },
                }}
                keyLabelRotate={30}
                keyLabelTextAlign="start"
                data={dailyStatisticInfoData}
                chartSetting={
                  {
                    scale: {
                      date: {
                        type: 'cat',
                      },
                    },
                  }
                }
              />
            )}
          </Card>
        ) : null}
        {rangeDateType === 'monthly' ? (
          <Card
            loading={loading}
            title="本期每天在院人次"
            bodyStyle={{ padding: '0 20px', minHeight: 420 }}
            style={cardStyle}
          >
            <LineOrArea
              height={400}
              area
              line
              shape="smooth"
              legend={false}
              data={dailyStatisticInfoData}
              titleMap={{
                x: 'date',
                filedsMap: { 在院人次: '在院人次' },
              }}
              areaColor={['#FFDB9C']}
              lineColor={['#FEA101']}
              grid={null}
              xAxisRotate={30}
            />
          </Card>
        ) : null}
      </Fragment>
    );
  }
}
