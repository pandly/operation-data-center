import React, { PureComponent } from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import Empty from '../../../components/Empty';
import { getRoutes } from '../../../utils/utils';

export default class Indicator extends PureComponent {

  render() {
    const { match, routerData } = this.props;
    const path = {
      pathname: '/dashboard/indicator/emphasis',
    }
    return (
      <Switch>
        {
          getRoutes(match.path, routerData).map(item => {
            return (
              <Route
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            )
          })
        }
        <Redirect exact from="/dashboard/indicator" to={path} />
        <Route render={Empty} />
      </Switch>
    );
  }
}
