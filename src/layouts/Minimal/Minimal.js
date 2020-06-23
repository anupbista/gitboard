import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Backdrop from '@material-ui/core/Backdrop';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
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
  const { loading, msg, setMsg } = useContext(GlobalContext)

  const handleSnackBarClose = () => {
    setMsg(null);
  };
  
  return (
    <div className={classes.root}>
      <Snackbar
        open={msg ? true : false}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
        message={msg}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={handleSnackBarClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
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
