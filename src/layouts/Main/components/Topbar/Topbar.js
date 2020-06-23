import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { GlobalContext } from '../../../../contexts/GlobalContext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link as RouterLink } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  menuButton: {
    color: theme.palette.primary.contrastText,
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  customWidth: {
    '& div': {
      width: '150px',
    }
  },
  pageName: {
    color: theme.palette.primary.contrastText,
    '&:first-letter': {
      textTransform: 'capitalize'
    }
  }
}));

const Topbar = props => {
  const classes = useStyles();
  const [open] = React.useState(false);
  const anchorRef = React.useRef(null);

  const { className, ...rest } = props;
  const { toggleSetMobileOpen } = useContext(GlobalContext);
  const [pageName, setPageName] = useState('Gitboard');

  const prevOpen = React.useRef(open);

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  React.useEffect(() => {
    setPageName(window.location.pathname.split("/").pop())
  }, []);

  return (
    <AppBar
      {...rest}
      position="fixed" className={classes.appBar}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleSetMobileOpen}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography varient="body1" className={classes.pageName}>{pageName}</Typography>
        <div className={classes.flexGrow} />
        <RouterLink to="/" className={classes.pageName}>
          <IconButton color="inherit">
            <ArrowBackIcon />
          </IconButton>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
