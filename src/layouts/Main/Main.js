import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import { Sidebar, Topbar } from './components';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GlobalContext } from '../../contexts/GlobalContext';
import GithubService from '../../services/github.service';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 52,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 52
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%',
    background: '#fff'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 10000,
    color: '#fff',
  }
}));

const Main = props => {
  const classes = useStyles();
  const { children } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true
  });
  const { loading, setuser, toggleLoading } = useContext(GlobalContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        toggleLoading(true)
        let res = await GithubService.getGitHubUserDetails(props.children.props.match.params.id);
        setuser(res.data.data.user);
        toggleLoading(false);
        } catch (error) {
        toggleLoading(false)
      }
    }
    fetchData();
  }, [props.children.props.match.params.id])

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Backdrop open={loading} className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Topbar />
      <Sidebar/>
      <main className={classes.content}>
        {children}
      </main>
    </div>
  )
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
