import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GlobalContext } from '../../contexts/GlobalContext';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  content: {
    height: '100%'
  },
  backdrop: {
   zIndex: theme.zIndex.drawer + 10000,
   color: '#fff',
 }
}));

const Minimal = props => {
  const { children } = props;

  const classes = useStyles();
  const { loading } = useContext(GlobalContext)

  
  return (
    <div className={classes.root}>
      <Backdrop open={loading} className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Minimal;
