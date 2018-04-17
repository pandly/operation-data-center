import React, { Component } from 'react';
import { Tabs, Button } from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './index.less';
const TabPane = Tabs.TabPane;

@connect(({ tab }) => ({
  tab,
}))

class TabNav extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = (activeKey) => {
    const { search } = this.props;
    let path = {
      pathname: activeKey,
      search
    };
    this.props.dispatch({
      type: 'tab/check',
      activeKey
    })
    this.props.dispatch(routerRedux.push(path));
  }
  //其实操控dispatch无异于操控state，区别在于将state的公有化，供其他模块使用
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }
  remove = (targetKey) => {
    const { tab, search } = this.props;
    const { panes, activeKey } = tab;
    const panesLength = panes.length;
    let lastIndex = 0;
    const findList = panes.findIndex(item => item.key === targetKey);
    if(findList === 0) {
      return;
    }
    findList === panesLength - 1 ? lastIndex = panesLength - 2 : lastIndex = findList + 1;
    const lastKey = panes[lastIndex].key;
    let path = {
      pathname: lastKey,
      search
    };
    this.props.dispatch(routerRedux.push(path));
    this.props.dispatch({
      type: 'tab/delete',
      payload: {
        findList,
        lastKey
      }
    })
  }
  render() {
    const { tab } = this.props;
    const { panes, activeKey } = tab;
    return (
      <div className={styles.tabNav}>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={activeKey}
          type="editable-card"
          tabBarStyle={{
            margin: 0
          }}
          onEdit={this.onEdit}
        >
          {panes.map(pane => <TabPane tab={pane.title} key={pane.key}></TabPane>)}
        </Tabs>
      </div>
    );
  }
}

export default TabNav;