import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Compare from '../../../components/Compare';
import { computeDays, getDateFromString, formatPercent } from '../../../utils/utils';
import {
  Row,
  Col,
  Card,
  Table,
} from 'antd';
import {
  Bar,
} from 'components/Charts';
import styles from './Bedspace.less';

@connect(({ bedspace, date, loading }) => ({
  bedspace,
  date,
  loading: loading.effects['bedspace/fetch'],
}))

export default class Bedspace extends Component {

  state = {
    rangeDateType: computeDays(this.props.date.indicator.beginDate, this.props.date.indicator.endDate) < 14 ? 'daily' : 'monthly',
    isOneDay: computeDays(this.props.date.indicator.beginDate, this.props.date.indicator.endDate) === 0,
  };

  componentDidMount() {
    const { date } = this.props;
    this.props.dispatch({
      type: 'bedspace/fetch',
      payload: {
        beginDate: date.indicator.beginDate,
        endDate: date.indicator.endDate,
      },
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bedspace/clear',
    });
  }

  render() {
    const { rangeDateType, isOneDay } = this.state;
    const { bedspace, loading, date } = this.props;
    const {
      internalSliceBedInfoModule = {}, // 内科片床位使用率
      surgicalSliceBedInfoModule = {}, // 外科片床位使用率
      specialSliceBedInfoModule = {}, // 特殊科室片区床位使用率
      diffSickBlockInfoModule = [], // 本月不同病区加床数和床位周转次数
      highestTurnoverTopTenModule = [], // 床位周转率最高的前十科室
      lowestTurnoverTopTenModule = [], // 床位周转率最低的前十科室
    } = bedspace;

    const internalData = [
      {
        item: '内科片区核定床位',
        count: internalSliceBedInfoModule && internalSliceBedInfoModule.approvedBedCount,
      },
      {
        item: '内科片区实际使用床位',
        count: internalSliceBedInfoModule && internalSliceBedInfoModule.useBedCount,
      },
      {
        item: '内科片区床位使用率',
        count: internalSliceBedInfoModule && formatPercent(internalSliceBedInfoModule.bedUsedRate),
      },
    ];
    const surgicalData = [
      {
        item: '外科片区核定床位',
        count: surgicalSliceBedInfoModule && surgicalSliceBedInfoModule.approvedBedCount,
      },
      {
        item: '外科片区实际使用床位',
        count: surgicalSliceBedInfoModule && surgicalSliceBedInfoModule.useBedCount,
      },
      {
        item: '外科片区床位使用率',
        count: surgicalSliceBedInfoModule && formatPercent(surgicalSliceBedInfoModule.bedUsedRate),
      },
    ];
    const specialData = [
      {
        item: '特殊片区核定床位',
        count: specialSliceBedInfoModule && specialSliceBedInfoModule.approvedBedCount,
      },
      {
        item: '特殊片区实际使用床位',
        count: specialSliceBedInfoModule && specialSliceBedInfoModule.useBedCount,
      },
      {
        item: '特殊片区床位使用率',
        count: specialSliceBedInfoModule && formatPercent(specialSliceBedInfoModule.bedUsedRate),
      },
    ];
    const columns = [
      {
        title: '片区',
        dataIndex: 'areaName',
        key: '1',
      },
      {
        title: '病区',
        dataIndex: 'wardName',
        key: '2',
      },
      {
        title: '床位周转次数',
        dataIndex: 'turnoverRate',
        key: '4',
      },
      {
        title: '床位周转次数环比数据',
        dataIndex: 'turnoverRateMom',
        key: '5',
        render: (text) => {
          return formatPercent(text);
        },
      },
    ];
    const cardStyle = {
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
          {isOneDay ? date.indicator.beginDate : `${date.indicator.beginDate} --- ${date.indicator.endDate}`}
        </div>
        {rangeDateType === 'daily' ? (
          <Row gutter={24}>
            <Col xl={14} lg={24} md={24} sm={24} xs={24}>
              <Row gutter={24}>
                <Col>
                  <Card
                    loading={loading}
                    title="内科片床位使用率"
                    style={cardStyle}
                    bodyStyle={{
                      height: 250,
                      padding: '0 20px',
                    }}
                  >
                    <div style={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                    }}
                    >
                      <div className={styles.leftCard}>
                        {internalData.map((data) => {
                          return (
                            <div key={data.item}>
                              <div style={{ color: '#666' }}>{data.item}</div>
                              <div style={{ color: '#333', fontSize: 20 }}>{data.count}</div>
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ flex: 1 }}>
                        <Bar
                          height={230}
                          size={25}
                          pbg={null}
                          grid={null}
                          axisValueLabel={null}
                          axisLine={null}
                          color="#3AC9A8"
                          padding={['10%', 0]}
                          formatPercent={val => formatPercent(val)}
                          fieldsMap={{
                            x: 'wardName',
                            keyMap: {
                              wardBedUsedRate: '床位使用率',
                            },
                          }}
                          legend={false}
                          data={internalSliceBedInfoModule.diffSickBlockBedUsedInfo}
                          useShape
                          labelSetting={{
                              htmlTemplate: (text, item, index) => `<div
                               style='transform: translate(0%, -0%);
                                  color:#3AC9A8;
                                  textAlign: center;
                                  fontSize: 12px;
                                  verticalAlign:middle
                              '>${text} </div>`,
                          }}
                        />
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col>
                  <Card
                    loading={loading}
                    title="外科片床位使用率"
                    style={cardStyle}
                    bodyStyle={{
                      height: 250,
                      padding: '0 20px',
                    }}
                  >
                    <div style={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                    }}
                    >
                      <div className={styles.leftCard}>
                        {surgicalData.map((data) => {
                          return (
                            <div key={data.item}>
                              <div style={{ color: '#666' }}>{data.item}</div>
                              <div style={{ color: '#333', fontSize: 20 }}>{data.count}</div>
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ flex: 1 }}>
                        <Bar
                          height={230}
                          size={25}
                          pbg={null}
                          grid={null}
                          axisValueLabel={null}
                          axisLine={null}
                          color="#FEA101"
                          padding={['10%', 0]}
                          formatPercent={val => formatPercent(val)}
                          fieldsMap={{
                            x: 'wardName',
                            keyMap: {
                              wardBedUsedRate: '床位使用率',
                            },
                          }}
                          legend={false}
                          data={surgicalSliceBedInfoModule.diffSickBlockBedUsedInfo}
                          useShape
                          labelSetting={{
                              htmlTemplate: (text, item, index) => `<div
                               style='transform: translate(0%, -0%);
                                  color:#FEA101;
                                  textAlign: center;
                                  fontSize: 12px;
                                  verticalAlign:middle
                              '>${text} </div>`,
                          }}
                          />
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col xl={10} lg={24} md={24} sm={24} xs={24}>
              <Card
                loading={loading}
                title="特殊科室片区床位使用率(包括不考核片区)"
                bodyStyle={{
                  height: 582,
                  padding: '0 10px',
                }}
                style={cardStyle}
              >
                <div className={styles.rowCardContent}>
                  {specialData.map((data) => {
                    return (
                      <div className={styles.part} key={data.item}>
                        <div className={styles.partOne}>{data.item}</div>
                        <div className={styles.partTwo} style={{ color: data.color }}>{data.count || '--'}</div>
                        {rangeDateType === 'monthly' && (
                          <div className={styles.partThree}>
                            <Compare value={data.mom} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div className={styles.bedVertical} style={{ left: '33.33%' }} />
                  <div className={styles.bedVertical} style={{ right: '33.33%' }} />
                </div>
                <Bar
                  height={350}
                  size={25}
                  pbg={null}
                  grid={null}
                  transpose
                  axisValueLabel={null}
                  axisLine={null}
                  color="#239BCB"
                  formatPercent={val => formatPercent(val)}
                  fieldsMap={{
                    x: 'wardName',
                    keyMap: {
                      wardBedUsedRate: '床位使用率',
                    },
                  }}
                  legend={false}
                  data={specialSliceBedInfoModule.diffSickBlockBedUsedInfo}
                  useShape

                  labelSetting={{
                      htmlTemplate: (text, item, index) => `<div
                       style='transform: translate(-50%, 100%);
                          color:#239BCB;
                          textAlign: center;
                          fontSize: 12px;
                          verticalAlign:middle
                      '>${text} </div>`,
                  }}
                  />
              </Card>
            </Col>
          </Row>
        ) : (
          <Row gutter={24}>
            <Col xl={11} lg={24} md={24} sm={24} xs={24}>
              <Card
                loading={loading}
                title="本期不同病区加床数和床位周转次数"
                bodyStyle={{
                  minHeight: 582,
                  padding: 0,
                }}
                style={cardStyle}
              >
                <Table
                  loading={loading}
                  dataSource={diffSickBlockInfoModule}
                  columns={columns}
                  pagination={false}
                  rowClassName={(record, index) =>
                    (index % 2 === 0 ? 'stripe' : '')
                  }
                />
              </Card>
            </Col>
            <Col xl={13} lg={24} md={24} sm={24} xs={24}>
              <Row gutter={24}>
                <Col>
                  <Card
                    loading={loading}
                    title="床位周转率最高的前十科室"
                    style={cardStyle}
                    bodyStyle={{
                      height: 250,
                      padding: '0 20px',
                    }}
                  >
                    <Bar
                        height={230}
                        size={25}
                        pbg={null}
                        grid={null}
                        padding={[20, 40, 50, 45]}
                        legend={false}
                        color="#3AC9A8"
                        formatPercent={val => formatPercent(val)}
                        fieldsMap={{
                            x: 'departName',
                            keyMap: {
                              turnoverRate: '周转率',
                            },
                          }}
                        data={highestTurnoverTopTenModule}
                      />
                  </Card>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col>
                  <Card
                    loading={loading}
                    title="床位周转率最低的前十科室"
                    style={cardStyle}
                    bodyStyle={{
                      height: 250,
                      padding: '0 20px',
                    }}
                  >
                    <Bar
                        height={230}
                        size={25}
                        pbg={null}
                        grid={null}
                        padding={[20, 40, 50, 45]}
                        legend={false}
                        color="#53BDE7"
                        formatPercent={val => formatPercent(val)}
                        fieldsMap={{
                          x: 'departName',
                          keyMap: {
                            turnoverRate: '周转率',
                          },
                        }}
                        data={lowestTurnoverTopTenModule}
                      />
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Fragment>
    );
  }
}
