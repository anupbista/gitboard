import React, { useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Drawer, Hidden } from '@material-ui/core';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import { Profile, SidebarNav, Footer } from './components';
import { GlobalContext } from '../../../../contexts/GlobalContext';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
    justifyContent: 'space-between'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { onClose, className, ...rest } = props;
  const { window } = props;
  const { mobileOpen, toggleSetMobileOpen, user } = useContext(GlobalContext);
  const classes = useStyles();
  const container = window !== undefined ? () => window().document.body : undefined;

  const pages = [
    {
      title: 'Repositories',
      href: user ? '/users/' + user.login + '/repositories' : '/opps',
      icon: <FolderSharedIcon />,
      children: []
    }
  ];

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          anchor="left"
          classes={{ paper: classes.drawerPaper }}
          onClose={toggleSetMobileOpen}
          open={mobileOpen}
          variant={'temporary'}
          container={container}
        >
          <div
            {...rest}
            className={clsx(classes.root, className)}
          >
            <div>
            <Profile user={user} />
            <SidebarNav
              close={true}
              className={classes.nav}
              pages={pages}
            />
            </div>
            <Footer />
          </div>
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{ paper: classes.drawerPaper }}
          open
          variant={'permanent'}
        >
          <div
            {...rest}
            className={clsx(classes.root, className)}
          >
           <div>
           <Profile user={user} />
            <SidebarNav
              close={false}
              className={classes.nav}
              pages={pages}
            />
           </div>
            <Footer />
          </div>
        </Drawer>
      </Hidden>
    </nav>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string
};

export default Sidebar;
