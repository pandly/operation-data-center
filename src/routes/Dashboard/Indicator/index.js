import React, { PureComponent } from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import NotFound from '../../Exception/404';
import { getRoutes } from '../../../utils/utils';

export default class Indicator extends PureComponent {

  render() {
    const { match, routerData } = this.props;
    const path = {
      pathname: '/dashboard/indicator/emphasis',
      //search: location.search ? location.search : `?startDate=${date}&endDate=${date}`
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
        <Route render={NotFound} />
      </Switch>
    );
  }
}
