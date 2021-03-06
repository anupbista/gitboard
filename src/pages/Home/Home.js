import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  TextField,
  Box,
  Typography,
  Paper,
} from '@material-ui/core';
import { useForm } from "react-hook-form";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import clsx from  'clsx';

import GithubService from '../../services/github.service';
import { GlobalContext } from '../../contexts/GlobalContext';
import { UsersDialog } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center'
  },
  container: {
    backgroundImage: `url(${"assets/background.svg"})`,
    backgroundPosition: 'right',
    backgroundSize: 'auto',
    height: '100vh',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
  logoImage: {
    width: '60%',
  },
  mainImage: {
    width: '100%'
  },
  paper:{
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100vh'
    }
  },
  form: {
    padding: 30,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  hiddensm:{
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  searchButton: {
    position: 'absolute',
    right: 0
  }
}));

const Home = props => {

  const classes = useStyles();
  const { toggleLoading, setMsg } = useContext(GlobalContext)
  const { register, handleSubmit, errors } = useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState({ users: [], error: false, hasNextPage: false, userCount: 0, searchText: null });

  const onSubmit = async (data) => {
    try {
      toggleLoading(true)
      let res = await GithubService.getGitHubUserByName(data.username);
      setData({
        users: [...res.data.data.search.edges],
        hasNextPage: res.data.data.search.pageInfo.hasNextPage,
        error: res.data.data.search.edges ? false : true,
        userCount: res.data.data.search.userCount,
        searchText: data.username
      })
      setModalOpen(true)
      toggleLoading(false);
      } catch (error) {
        toggleLoading(false)
        setMsg(error.message)
    }
  };

  const handleDialogClose = () => {
    setModalOpen(false);
    // setData({ users: [], error: false, hasNextPage:false, userCount: 0, searchText: null });
  }
 

  return (
    <div className={classes.root}>
      <UsersDialog modalOpen={modalOpen} data={data} onClose={handleDialogClose} />
      <Grid
        container
        className={classes.container}
      >
        <Grid
          className={clsx(classes.content, classes.hiddensm)}
          item
          sm={6}
          xs={12}
        >
          <Box justifyContent="center" display="flex" alignItems="center">
            <img className={classes.mainImage}
              alt="Logo"
              src="assets/search-pana.svg"
            />
          </Box>
        </Grid>
        <Grid
          className={classes.content}
          item
          sm={6}
          xs={12}
        >

          <div className={classes.content}>
            <Paper className={clsx(classes.content, classes.paper)}>
              <form
                className={classes.form}
                onSubmit={handleSubmit(onSubmit)}
              >
                <Box justifyContent="center" display="flex">
                  <img className={classes.logoImage}
                    alt="Logo"
                    src="assets/logo.png"
                  />
                </Box>
                <Typography
                  className={classes.title}
                  variant="body2"
                >
                  Search by the name or username of github user
                </Typography>
                <Box justifyContent="center" alignItems="center" display="flex" position="relative">
                  <TextField
                    className={classes.textField}
                    fullWidth
                    label="Name/Username"
                    name="username"
                    type="text"
                    error={errors.username ? true : false}
                    helperText={
                      errors.username ? 'Name/Username is required' : null
                    }
                    inputRef={register({ required: true })}
                    variant="outlined"
                  />
                  <IconButton aria-label="search"
                    className={classes.searchButton}
                    color="primary"
                    type="submit"
                    variant="contained"
                  >
                    <SearchIcon />
                  </IconButton>
                </Box>
              </form>
            </Paper>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

Home.propTypes = {
  history: PropTypes.object
};

export default withRouter(Home);
