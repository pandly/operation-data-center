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
    canvasHeights: [],
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
    window.onresize = () => {
      this.setState({
        canvasHeights: this.canvasCards.map(ele => ele.container.querySelector('.ant-card-body').clientHeight),
      });
    };
    this.setState({
      canvasHeights: this.canvasCards.map(ele => ele.container.querySelector('.ant-card-body').clientHeight),
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bedspace/clear',
    });
  }
  canvasCards= []
  render() {
    const { rangeDateType, isOneDay } = this.state;
    const { bedspace, loading, date } = this.props;
    const {
      internalSliceBedInfoModule = {}, // 内科片床位使用率
      surgicalSliceBedInfoModule = {}, // 外科片床位使用率
      specialSliceBedInfoModule = {}, // 特殊科室片区床位使用率
      diffSickBlockInfoModule = [], // 本期不同病区加床数和床位周转次数
      highestTurnoverTopTenModule = [], // 床位周转率最高的前十科室
      lowestTurnoverTopTenModule = [], // 床位周转率最低的前十科室
    } = bedspace;

    // if(diffSickBlockInfoModule) {
    //   let area = {};
    //   diffSickBlockInfoModule.forEach(data => {
    //     if(area.hasOwnProperty(data.areaName)){
    //       area[data.areaName] += 1;
    //     }else {
    //       area[data.areaName] = 1;
    //     }
    //   })
    //   for(let [key, value] of Object.entries(area)) {
    //     let mark = false;
    //     diffSickBlockInfoModule.forEach(data => {
    //       if(!mark && data.areaName === key) {
    //         data.setLength = value;
    //         mark = true;
    //       }else if(data.areaName === key) {
    //         data.setLength = 0;
    //       }
    //     })
    //   }
    // }

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
        // render: (value, row, index) => {
        //   const obj = {
        //     children: value,
        //     props: {},
        //   };
        //   if (row.setLength) {
        //     obj.props.rowSpan = row.setLength;
        //   }else if(row.setLength == 0) {
        //     obj.props.rowSpan = row.setLength;
        //   }else{
        //     obj.props.rowSpan = 1;
        //   }
        //   return obj;
        // },
        width: 100,
      },
      {
        title: '病区',
        dataIndex: 'wardName',
        key: '2',
        width: 100,
      },
      {
        title: '床位周转次数',
        dataIndex: 'turnoverRate',
        sorter: (a, b) => (a.turnoverRate || 0) - (b.turnoverRate || 0),
        key: '4',
        width: 150
      },
      {
        title: '床位周转次数环比数据',
        dataIndex: 'turnoverRateMom',
        key: '5',
        sorter: (a, b) => (a.turnoverRateMom || 0) - (b.turnoverRateMom || 0),
        render: text => {
          return <Compare value={text} />
        },
        width: 150
      },
    ];
    const cardStyle = {
      marginBottom: 20,
      boxShadow: '0 0 4px 0 #E8E8E8',
      flex: 1,
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
                          shapeTypes={['borderRadius']}
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
                          shapeTypes={['borderRadius']}
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
                  shapeTypes={['borderRadius']}
                  keyLabelTextAlign="start"
                  labelSetting={{
                      htmlTemplate: (text, item, index) => `<div
                       style='transform: translate(10%, 100%);
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
          <div className="autoHeightCardWrap">
            <div className="autoHeightCard" style={{ marginRight: 20, width: '45%' }}>
              <div className="cardTitle">本期不同病区床位周转次数</div>
              <div className="cardBody" style={{ padding: 0 }}>
                <Table
                  loading={loading}
                  dataSource={diffSickBlockInfoModule}
                  columns={columns}
                  pagination={false}
                  scroll={{ y: true }}
                  rowClassName={(record, index) =>
                    (index % 2 === 0 ? 'stripe' : '')
                  }
                />
              </div>
            </div>
            <div style={{
              width: '55%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
            >
              <Card
                loading={loading}
                title="床位周转率最高的前十科室"
                style={{
                  marginBottom: 20,
                  boxShadow: '0 0 4px 0 #E8E8E8',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
                bodyStyle={{
                  padding: '0 20px',
                  flexGrow: 1,
                  overflow: 'hidden',
                }}
                ref={node => this.canvasCards[0] = node}
                >
                <Bar
                  height={this.state.canvasHeights[0] || 0}
                  size={25}
                  pbg={null}
                  grid={null}
                  padding={[20, 65, 50, 65]}
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
              <Card
                loading={loading}
                title="床位周转率最低的前十科室"
                style={{
                  marginBottom: 20,
                  boxShadow: '0 0 4px 0 #E8E8E8',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
                bodyStyle={{
                  padding: '0 20px',
                  flexGrow: 1,
                  overflow: 'hidden',
                }}
                ref={node => this.canvasCards[0] = node}
              >
                <Bar
                  height={this.state.canvasHeights[0] || 0}
                  size={25}
                  pbg={null}
                  grid={null}
                  padding={[20, 65, 50, 65]}
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
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}
