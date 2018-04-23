import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Card,
  DatePicker,
  Divider,
} from 'antd';
import {
  Pie,
  Bar,
  WaterWave,
} from 'components/Charts';
import Progress from '../../../components/Progress';
import Compare from '../../../components/Compare';
import NoData from '../../../components/NoData';
import { getRangePickerValue, computeDays, formatPercent } from '../../../utils/utils';

import styles from './Emphasis.less';

const { RangePicker } = DatePicker;

@connect(({ emphasis, date, loading }) => ({
  emphasis,
  date,
  loading: loading.effects['emphasis/fetch'],
}))

export default class Emphasis extends PureComponent {

  state = {
    rangePickerValue: getRangePickerValue(this.props.date.indicator),
    rangeDateType: computeDays(this.props.date.indicator.beginDate, this.props.date.indicator.endDate) < 14 ? 'daily' : 'monthly',
  };

  componentDidMount() {
    const { date } = this.props;
    this.props.dispatch({
      type: 'emphasis/fetch',
      payload: {
        beginDate: date.indicator.beginDate,
        endDate: date.indicator.endDate,
      },
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'emphasis/clear',
    });
  }

  handleCardClick = (num) => {
    let params, title;
    switch (num) {
      case 0:
        params = 'consumable';
        title = '耗材';
        break;
      case 1:
        params = 'quality';
        title = '医疗质量';
        break;
      case 2:
        params = 'surgery';
        title = '手术';
        break;
      case 3:
        params = 'bedspace';
        title = '床位';
        break;
      case 4:
        params = 'appointment';
        title = '预约';
        break;
    }
    const path = {
      pathname: `/dashboard/indicator/${params}`,
      search: this.props.location.search,
    };
    const payload = {
      title,
      key: path.pathname,
      content: '',
    };
    this.props.dispatch({
      type: 'tab/update',
      payload,
    });
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
      type: 'emphasis/fetch',
      payload: {
        beginDate: dateStr[0],
        endDate: dateStr[1],
      },
    });
    this.props.dispatch({
      type: 'date/update',
      payload: {
        indicator: {
          beginDate: dateStr[0],
          endDate: dateStr[1],
        },
      },
    });
  };
  disabledDate = (current) => {
    const currentDate = `${new Date().toLocaleDateString()} 08:00:00`;
    // can not select days after today
    return current.valueOf() >= new Date(currentDate).valueOf() || current.valueOf() < new Date('2016/1/1 08:00:00').valueOf();
  };
  render() {
    const { rangePickerValue, rangeDateType } = this.state;
    const { emphasis, loading } = this.props;

    let {
      supplyModule = [], // 耗材
      medicalQuantityModule = {}, // 医疗质量
      surgeryModule = {}, // 手术
      bedModule = {}, // 床位
      medicalTechnologyModule = [], // 医技
      reservationModule = {}, // 预约
    } = emphasis;

    const surgeryData = surgeryModule && [
      {
        item: '一类手术',
        count: surgeryModule.oneTypeSurgeryCount,
        rate: surgeryModule.oneTypeSurgeryRate,
      },
      {
        item: '二类手术',
        count: surgeryModule.twoTypeSurgeryCount,
        rate: surgeryModule.twoTypeSurgeryRate,
      },
      {
        item: '三类手术',
        count: surgeryModule.threeTypeSurgeryCount,
        rate: surgeryModule.threeTypeSurgeryRate,
      },
      {
        item: '四类手术',
        count: surgeryModule.fourTypeSurgeryCount,
        rate: surgeryModule.fourTypeSurgeryRate,
      },
      {
        item: '特殊手术',
        count: surgeryModule.specialSurgeryCount,
        rate: surgeryModule.specialSurgeryRate,
      },
      {
        item: '检查操作',
        count: surgeryModule.checkOperationCount,
        rate: surgeryModule.checkOperationRate,
      },
      {
        item: '治疗操作',
        count: surgeryModule.treatmentOperationCount,
        rate: surgeryModule.treatmentOperationRate,
      },
      {
        item: '急诊手术',
        count: surgeryModule.emerSurgeryCount,
        mom: surgeryModule.emerSurgeryCountMom,
      },
      {
        item: '择期手术',
        count: surgeryModule.electiveSurgeryCount,
        mom: surgeryModule.electiveSurgeryCountMom,
      },
    ]
    const badSpace = bedModule && (rangeDateType === 'daily' ? [
      {
        item: '急诊病区使用床位',
        count: bedModule.emergencyBedCount,
        color: '#FEA101',
      },
      {
        item: '重症科医学使用床位',
        count: bedModule.citicalBedCount,
        color: '#FF8465',
      },
      {
        item: '其他使用床位',
        count: bedModule.otherBedCount,
        color: '#53BDE7',
      },
    ] : [
      {
        item: '床位周转次数',
        count: bedModule.turnoverRate,
        color: '#FF8465',
        mom: bedModule.turnoverRateMom,
      },
      {
        item: '床位周转率',
        count: formatPercent(bedModule.turnoverRate),
        color: '#53BDE7',
        mom: bedModule.turnoverRateMom,
      }
    ])
    const appointment = reservationModule && [
      {
        item: '预约人数',
        count: reservationModule.reservationCount,
        color: '#FEA101',
        mom: reservationModule.reservationCountMom,
      },
      {
        item: '预约就诊人数',
        count: reservationModule.visitCount,
        color: '#FF8465',
        mom: reservationModule.visitCountMom,
      },
    ];
    const keyMap = {};
    if(supplyModule && supplyModule.length !== 0){
      if(supplyModule[0].materialRateLastMonth){
        keyMap['materialRateLastMonth'] ='上期'
      }
      if(supplyModule[0].materialRate){
        keyMap['materialRate'] = '本期'
      }
      if(supplyModule[0].materialRateLastYear){
        keyMap['materialRateLastYear'] = '去年本期'
      }
    } 
    const cardStyle = {
      marginBottom: 20,
      boxShadow: '0 0 4px 0 #E8E8E8',
    };
    return (
      <Fragment>
        <Card
          style={cardStyle}
          bodyStyle={{ padding: 20 }}>
          <span style={{ color: '#333', fontWeight: '500' }}>选择日期：</span>
          <RangePicker
            value={rangePickerValue}
            disabledDate={this.disabledDate}
            onChange={this.handleRangePickerChange}
            style={{ width: 256 }}
          />
        </Card>

        <Row gutter={24}>
          <Col xl={12} lg={12} md={24} sm={24} xs={24}>
            <Card
              loading={loading}             
              title="耗材"
              style={cardStyle}
              bodyStyle={{
                padding: '0 20px',
                height: rangeDateType === 'monthly' ? 273 : 148
              }}
              hoverable={supplyModule ? true : false}
              onClick={() => supplyModule && this.handleCardClick(0)}>
              {supplyModule ? 
                (
                  rangeDateType === 'monthly' ? 
                  (
                    <div>
                      <Bar 
                        height={230}
                        size={25} 
                        color={['#FEA101', '#FF8465', '#3AC9A8']}
                        axisLine={null}
                        axisValueLabel={null}
                        legend={false}
                        padding={['10%',0]}
                        legend
                        formatPercent={val => formatPercent(val)}
                        fieldsMap={{
                          x: 'name', 
                          keyMap
                        }}
                        shapeTypes={['borderRadius']}
                        data={supplyModule} 
                      />
                    </div>
                  ) : 
                  (
                    <div className={styles.dailyConsumable}>
                      {supplyModule.map(data => {
                        return (
                          <div className={styles.part} key={data.name}>
                            <div className={styles.item}>{data.name}</div>
                            <div className={styles.ratio}>{formatPercent(data.materialRate)}</div>
                          </div>
                        )
                      })}
                      <Divider type="vertical" className={styles.vertical}/>
                    </div>
                  )
                ) : (<NoData />)
              }
            </Card>         
          </Col>
          <Col xl={12} lg={12} md={24} sm={24} xs={24}>
            <Card
              loading={loading}             
              title="医疗质量"
              style={cardStyle}
              bodyStyle={{
                padding: '0 20px',
                height: rangeDateType === 'monthly' ? 273 : 148,
                textAlign: 'center'
              }}
              hoverable={medicalQuantityModule ? true : false}
              onClick={() => medicalQuantityModule && this.handleCardClick(1)}>
              {medicalQuantityModule ? 
                (rangeDateType === 'monthly' ? 
                  (
                    <div className={styles.monthlyQuality}>
                      <WaterWave height={161} percent={parseFloat(formatPercent(medicalQuantityModule.completeMedicalRecordsRate))} />
                      <Compare value={medicalQuantityModule.completeMedicalRecordsRateMom} />
                      <div className={styles.item}>运行病历按时完成率</div> 
                    </div>
                  ) : 
                  (
                    <div className={styles.horizontalProgress}>
                      <div style={{flex: 1}}>
                        <Progress 
                          percent={medicalQuantityModule.completeMedicalRecordsRate}
                          width={20}
                          radius={8}
                          color="#3AC9A8"
                          background="#C5EFE5"
                          textSize={20}
                        />
                      </div>
                      <div className={styles.item}>运行病历按时完成率</div> 
                    </div>
                  )
                ) : (<NoData />)
              }
            </Card>    
          </Col>       
        </Row>

        <Row gutter={24}>
          <Col xl={14} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              title="手术和占比"
              hoverable={surgeryModule ? true : false}
              style={cardStyle}
              bodyStyle={{ 
                height: 260, 
                padding: '0 10px 20px 20px',
              }}
              onClick={() => surgeryModule && this.handleCardClick(2)}> 
              {surgeryModule ? 
                (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    height: '100%'}}>
                    <div style={{
                      flex: 1,
                      marginRight: 30}}>
                      {surgeryData.slice(7).map(data => {
                        return (
                          <div className={styles.surgeryCard} style={{ width: '100%' }} key={data.item}>
                            <div className={styles.item}>{data.item}</div>
                            <div className={styles.count}>
                              <div className={styles.left}>{data.count}</div>
                              {rangeDateType === 'monthly' && (
                                <div className={styles.right}>
                                  <Compare value={data.mom} />
                                </div>
                              )}       
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div style={{
                      flex: 5}}>
                      {surgeryData.slice(0, 7).map(data => {
                        return (
                          <div style={{
                            display: 'inline-block',
                            width: '25%',
                            padding: '0 10px',
                          }} key={data.item}>
                            <div className={styles.surgeryCard}>
                              <div className={styles.item}>{data.item}</div>
                              <div className={styles.count}>
                                <div className={styles.left}>{data.count}</div>
                                <div className={styles.right}>{formatPercent(data.rate)}</div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div> 
                  </div>
                ) : (<NoData />)
              }               
            </Card>
          </Col>
          <Col xl={10} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              title="床位"
              hoverable={bedModule ? true : false}
              bodyStyle={{ 
                height: 260,
                padding: rangeDateType === 'daily' ? '0 10px 20px 38px' : '30px 0'
              }}
              style={cardStyle}
              onClick={() => bedModule && this.handleCardClick(3)}>
              {bedModule ? 
                (
                  rangeDateType === 'daily' ? 
                  (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center'}}>
                      <div>
                        {badSpace.map(data => {
                          return (
                            <div className={styles.badSpaceLegend} key={data.item}>
                              <span className={styles.point} style={{ background: data.color}}></span>
                              <span className={styles.item}>{data.item}</span>
                              <div style={{ color: data.color, fontSize: 20, paddingLeft: 20 }}>{data.count}</div>
                            </div>
                          )
                        })}
                      </div>
                      <div style={{flex: 1}}>            
                        <Pie
                          innerRadius={0.6}
                          subTitle="使用床位"
                          total={bedModule.totalBedCount}
                          data={badSpace}
                          height={240}
                          colors={['#FEA101', '#FF8465', '#53BDE7']}
                        />
                      </div>
                    </div>
                  ) : 
                  (
                    <div className={styles.rowCardContent}>
                      {badSpace.map(data => {
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
                        )                 
                      })}
                      <div className={styles.bedVertical} style={{ left: '50%' }}></div>
                    </div>
                  )
                ) : ( <NoData />)
              }
            </Card>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={14} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              title="医技"
              bodyStyle={{ height: 288, padding: '0 10px' }}
              style={cardStyle}>
              {medicalTechnologyModule ? 
                (
                  medicalTechnologyModule.map(item => {
                    return (
                      <div className={styles.wrapCard} key={item.medicalTechName}>
                        <Card
                          className={styles.technologyCard}
                          bodyStyle={{ padding: '6px 0 6px 0' }}>
                          <div className={styles.item}>{item.medicalTechName}</div>
                          <div className={styles.count}>{ item.medicalTechCount == undefined ? '--' : item.medicalTechCount }</div>
                          {rangeDateType === 'monthly' && (
                            <div className={styles.compare}>
                              <Compare value={item.medicalTechCountMom} />
                            </div>
                          )}  
                        </Card>
                      </div>
                    )
                  })
                ) : (<NoData />)
              }
            </Card>
          </Col>
          <Col xl={10} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              title="预约"
              hoverable={reservationModule ? true : false}
              bodyStyle={{ height: 288, padding: '0 20px' }}
              style={cardStyle}
              onClick={() => reservationModule && this.handleCardClick(4)}>
              {reservationModule ? 
                (
                  <div>
                    <div className={styles.rowCardContent}>
                      {appointment.map(data => {
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
                        )                 
                      })}             
                    </div>
                    <div className={styles.horizontalProgress}>
                      <div style={{flex: 1}}>
                        <Progress 
                          percent={reservationModule.visitRate}
                          width={20}
                          radius={8}
                          color='#FF8465'
                          background='#FCDFD8'
                          textSize={20}
                        />
                      </div>
                      <div className={styles.item}>预约就诊率</div> 
                    </div>
                  </div>
                ) : 
                (<NoData />)
              }
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
