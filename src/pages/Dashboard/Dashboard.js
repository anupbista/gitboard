import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Repository } from './components';
import { GlobalContext } from '../../contexts/GlobalContext';
import { CloneDialog } from './components';
import GithubService from '../../services/github.service';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    textAlign: 'center'
  },
  image: {
    display: 'inline-block',
    maxWidth: '100%',
    width: 560,
    marginBottom: 50,
  },
  loader: {
    position: 'relative',
    left: 'calc(50% - 20px)'
  },
  marginBottom:{
    marginBottom: theme.spacing(3)
  },
  noMargin: {
    marginBottom: 0
  }
}));


const Dashboard = (props) => {
  const classes = useStyles();
  const { user, setMsg } = useContext(GlobalContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [hasNextPage, setHasNextPage] = React.useState(false);
  const [repos, setRepos] = React.useState([]);

  useEffect(() => {
    if (user.login) {
      setHasNextPage(user.repositories.pageInfo.hasNextPage);
      setRepos(user.repositories.edges)
    }
  }, [user])

  useEffect(() => {
    if (repos.length > 0 && !hasNextPage) {
      setMsg(`That's all from ${user.login}`)
    }
  }, [hasNextPage])

  const handleDialogClose = () => {
    setModalOpen(false);
  }

  const handleDialogOpen = () => {
    setModalOpen(true);
  }

  const loadMoreRepos = async () => {
    try {
      let res = await GithubService.getGitHubUserRepos(user.login, repos[repos.length - 1]['cursor']);
      if (res.data.data) {
        setHasNextPage(res.data.data.user.repositories.pageInfo.hasNextPage)
        setRepos([...repos, ...res.data.data.user.repositories.edges])
      }
    } catch (error) {
      setHasNextPage(false)
      setMsg(error.message)
    }
  }

  return (
    <div className={classes.root}>
      <CloneDialog modalOpen={modalOpen} onClose={handleDialogClose} />
      <InfiniteScroll
        pageStart={0}
        threshold={100}
        initialLoad={false}
        useWindow={true}
        loadMore={loadMoreRepos}
        hasMore={hasNextPage}
        loader={<CircularProgress className={classes.loader} key={0} />}
      >
        <Grid
          container
          justify="flex-start"
          spacing={4}
          className={hasNextPage ? classes.marginBottom : classes.noMargin}
        >
          {
            repos && repos.map(repo => {
              return (
                <Grid item xs={12} sm={6} key={repo.node.id}>
                  <Repository repo={repo.node} onClose={handleDialogOpen} />
                </Grid>
              )
            })
          }
        </Grid>
      </InfiniteScroll>
    </div>
  );
};

export default Dashboard;
