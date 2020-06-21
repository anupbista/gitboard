import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    minHeight: 'fit-content'
  },
  avatar: {
    width: 80,
    height: 80
  },
  name: {
    marginTop: theme.spacing(1)
  },
  status: {
    marginTop: theme.spacing(2),
    background: theme.palette.ascent.main,
    color: theme.palette.white,
    '&:hover':{
      background: theme.palette.ascent.main,
      color: theme.palette.white
    }
  }
}));

const Profile = props => {
  const { className, user, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatarUrl}
        to="/account"
      />
      <Typography
        className={classes.name}
        variant="h5"
      >
        {user.name}
      </Typography>
      <Typography variant="body2">{user.login}</Typography>
      {
        user.status && <Button size="small" variant="contained" disableElevation className={classes.status}>
          {user.status.message}
        </Button>
      }
      <Box justifyContent="center" flexDirection="row" display="flex" alignItems="center" mt={2}>
        <Box justifyContent="center" flexDirection="column" display="flex" alignItems="center" m={1}>
          <Typography
            variant="body1">
            {user.followers?.totalCount}
          </Typography>
          <Typography
            variant="caption">
            Followers
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box justifyContent="center" flexDirection="column" display="flex" alignItems="center" m={1}>
        <Typography
            variant="body1">
            {user.following?.totalCount}
          </Typography>
          <Typography
            variant="caption">
            Following
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
