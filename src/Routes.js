import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import { Minimal as MinimalLayout, Main as MainLayout } from './layouts';
import { RouteWithLayout } from './components';

import {
  Home as HomeView,
  Dashboard as DashboardView,
  NotFound as NotFoundView
} from './pages';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <RouteWithLayout
          component={HomeView}
          exact
          layout={MinimalLayout}
          path="/"
        />
        <RouteWithLayout
          component={DashboardView}
          exact
          layout={MainLayout}
          path="/users/:id/repositories"
        />
        <RouteWithLayout
          component={NotFoundView}
          exact
          layout={MinimalLayout}
          path="/opps"
        />
        <Redirect to="/opps" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
