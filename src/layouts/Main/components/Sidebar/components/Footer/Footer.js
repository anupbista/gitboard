import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom:  theme.spacing(2),
    flexDirection: 'column',
    '& img': {
      width: '70%'
    }
  },
  copyright: {
    marginTop:  theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  heart: {
    fontSize: 15,
    margin: '0 5px',
    color: theme.palette.ascent.main
  }
}));

const Footer = props => {
  const { className, ...rest } = props;
  const date = new Date().getFullYear();
  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
       <RouterLink to="/" className={classes.logo}>
          <img
            alt="Logo"
            src="/assets/logo.png"
          />
        </RouterLink>
      <Typography variant="body1">
        &copy;{' '}
        anupbista
        . {date}
      </Typography>
      <Typography variant="caption" className={classes.copyright}>
        Created with <FavoriteIcon  className={classes.heart} /> for the cosmos.
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
