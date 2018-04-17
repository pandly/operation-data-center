import React, { PureComponent } from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import NotFound from '../../Exception/404';
import { getRoutes } from '../../../utils/utils';

export default class Report extends PureComponent {

  render() {
    const { match, routerData } = this.props;
    const path = {
      pathname: '/dashboard/report/dynamic',
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
        <Redirect exact from="/dashboard/report" to={path} />
        <Route render={NotFound} />
      </Switch>
    );
  }
}
