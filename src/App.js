import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';
import Routes from './Routes';
import history from './services/history';
import GlobalContextProvider from './contexts/GlobalContext';

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalContextProvider>
          <Router history={history}>
            <Routes />
          </Router>
        </GlobalContextProvider>
      </ThemeProvider>
    );
  }
}