import React, { useEffect, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';

import { GlobalContext } from '../../../../contexts/GlobalContext';
import GithubService from '../../../../services/github.service';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  image: {
    maxWidth: '65%'
  },
  loader:{
    position: 'relative',
    left: 'calc(50% - 20px)'
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const UsersDialog = withStyles(styles)((props) => {
  const [open, setOpen] = React.useState(props.modalOpen);
  const [users, setUsers] = React.useState(props.data.users);
  const [hasNextPage, setHasNextPage] = React.useState(props.data.hasNextPage);
  const { setMsg } = useContext(GlobalContext)
  const { classes, data } = props;
  let searchText = props.data.searchText;

  useEffect(() => {
    setOpen(props.modalOpen);
  }, [props.modalOpen])

  useEffect(() => {
    setUsers(props.data.users);
    setHasNextPage(props.data.hasNextPage);
  }, [props.data])

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const loadMoreUsers = async () => {
    try {
      let res = await GithubService.getGitHubUserByName(searchText, users[users.length - 1]['cursor']);
      if (res.data.data) {
        setHasNextPage(res.data.data.search.pageInfo.hasNextPage)
        setUsers([...users, ...res.data.data.search.edges])
      }
    } catch (error) {
      setHasNextPage(false)
      setMsg(error.message)
    }
  }

  // const handleUserClick = (user) => {
  //   history.push('/users/' + user.login + '/repositories')
  // };

  return (
    <Dialog fullWidth={true} maxWidth={'xs'} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {
          !data.error ? 'Users' : 'User Not Found'
        }
      </DialogTitle>
     
        <DialogContent dividers>
          
          {!data.error ? (
            <React.Fragment>
              <Typography variant="caption">
                Click on the user to view repositories
        </Typography>
        <InfiniteScroll
        pageStart={0}
        threshold={100}
        initialLoad={false}
        useWindow={false}
        loadMore={loadMoreUsers}
        hasMore={hasNextPage}
        loader={<CircularProgress className={classes.loader} key={0} />}
      >

              <List key={Math.random()}>
              {
                users.map(user => {
                  return (
                    user.node.login && <Link to={'/users/' + user.node.login + '/repositories'} key={user.node.id}>
                      {/* <ListItem onClick={() => handleUserClick(user)} key={user.id}> */}
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar alt={user.node.name} src={user.node.avatarUrl} />
                        </ListItemAvatar>
                        <ListItemText primary={user.node.name} secondary={user.node.login} />
                      </ListItem>
                    </Link>
                  )
                })
              }
              </List>
              </InfiniteScroll>
          </React.Fragment>
          ) : (
            <Box justifyContent="center" flexDirection="column" display="flex" alignItems="center">
          <img
            className={classes.image}
            alt="User not found"
            src="assets/user_not_found.svg"
          />
          <Typography variant="subtitle2">
            Check if the username is correct!!!
             </Typography>
        </Box>
          )}
      </DialogContent>
         
      {
    data.error && (
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          OK
          </Button>
      </DialogActions>
    )
  }
    </Dialog >
  );
})

UsersDialog.propTypes = {
  history: PropTypes.object
};

export default withRouter(UsersDialog);