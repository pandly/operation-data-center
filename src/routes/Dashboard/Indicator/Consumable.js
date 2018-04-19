import React, { Component, Fragment } from 'react'
import { connect } from 'dva';
import Compare from '../../../components/Compare';
import { computeDays, getDateFromString, yuan, formatPercent } from '../../../utils/utils';
import {
  Table
} from 'antd';
import styles from './Consumable.less';

@connect(({ consumable, date, loading }) => ({
  consumable,
  date,
  loading: loading.effects['consumable/fetch'],
}))

export default class Consumable extends Component {

  state = {
    rangeDateType: computeDays(this.props.date.indicator.beginDate, this.props.date.indicator.endDate) < 14 ? 'daily' : 'monthly',
    isOneDay: computeDays(this.props.date.indicator.beginDate, this.props.date.indicator.endDate) === 0 ? true : false
  };

  componentDidMount() {
    const { date } = this.props;
    this.props.dispatch({
      type: 'consumable/fetch',
      payload: {
        beginDate: date.indicator.beginDate,
        endDate: date.indicator.endDate
      }
    })
  }
  
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'consumable/clear',
    });
  }

  render() {
    const { rangeDateType, isOneDay } = this.state;
    const { consumable, loading, date } = this.props;
    const { 
      diffDepartSupplyIncomeModule
    } = consumable;
    let columns = [
      {
        title: '科室名称',
        dataIndex: 'departName',
        key: 'departName',
        width: 200
      }, 
      {
        title: '门诊材料费',
        dataIndex: 'outpatientMaterialCostCount',
        key: 'outpatientMaterialCostCount',
        sorter: (a, b) => a.outpatientMaterialCostCount - b.outpatientMaterialCostCount,
        render: text => {
          return yuan(text)
        },
        width: 200
      }, 
      {
        title: '住院材料费',
        dataIndex: 'inHospitalMaterialCostCount',
        key: 'inHospitalMaterialCostCount',
        sorter: (a, b) => a.inHospitalMaterialCostCount - b.inHospitalMaterialCostCount,
        render: text => {
          return yuan(text)
        },
        width: 200
      }, 
      {
        title: '卫生总费用',
        dataIndex: 'totalHealthCostCount',
        key: 'totalHealthCostCount',
        sorter: (a, b) => a.totalHealthCostCount - b.totalHealthCostCount,
        render: text => {
          return yuan(text)
        },
        width: 200
      },  
      {
        title: '耗材收入占比',
        dataIndex: 'materialCostRate',
        key: 'materialCostRate',
        sorter: (a, b) => a.materialCostRate - b.materialCostRate,
        render: text => {
          return formatPercent(text);
        },
        width: 200
      }
    ];
    if(rangeDateType === 'monthly') {
      const columnObject =  {
        title: '耗材收入占比环比',
        dataIndex: 'materialCostRateMom',
        key: 'materialCostRateMom',
        sorter: (a, b) => a.materialCostRateMom - b.materialCostRateMom,
        render: text => {
          return (
            <Compare value={text} />
          )  
        },
        width: 200
      }
      columns.push(columnObject);
    }
    return (
      <Fragment>
        <div style={{
          marginTop: '-10px',
          marginBottom: '10px',
          color: '#333'
        }}>
          {isOneDay ? date.indicator.beginDate : `${date.indicator.beginDate} --- ${date.indicator.endDate}`}
        </div>
        <div className="autoHeightCardWrap">
          <div className="autoHeightCard" style={{ width: '100%' }}>
            <div className="cardTitle">不同科室的耗材收入占比</div>
            <div className="cardBody" style={{ padding: 0 }}>
              <Table 
                loading={loading}
                dataSource={diffDepartSupplyIncomeModule}
                columns={columns}
                pagination={false}
                scroll={{ y: true }}
                rowClassName={(record, index) => 
                  index % 2 === 0 ? 'stripe' : ''
                }
              />
            </div>
          </div> 
        </div>
      </Fragment>
    )
  }
}
