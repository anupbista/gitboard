import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { Minimal as MinimalLayout, Main as MainLayout } from './layouts';
import { RouteWithLayout } from './components';

import {
  Home as HomeView,
  Dashboard as DashboardView
} from './pages';

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={HomeView}
        exact
        layout={MinimalLayout}
        path="/"
      />
      <RouteWithLayout
        component={DashboardView}
        layout={MainLayout}
        path="/users/:id/repositories"
      />
    </Switch>
  );
};

export default Routes;
