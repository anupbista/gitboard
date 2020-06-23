import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Repository } from './components';
import { GlobalContext } from '../../contexts/GlobalContext';
import { CloneDialog } from './components';

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
  }
}));


const Dashboard = () => {
  const classes = useStyles();
  const { user } = useContext(GlobalContext);
  const [modalOpen, setModalOpen] = useState(false);
  
  const handleDialogClose = () => {
    setModalOpen(false);
  }

  const handleDialogOpen = () => {
    setModalOpen(true);
  }

  return (
    <div className={classes.root}>
       <CloneDialog modalOpen={modalOpen} onClose={handleDialogClose} />
      <Grid
        container
        justify="flex-start"
        spacing={4}
      >
        {
          user?.repositories && user?.repositories.nodes.map(repo => {
            return (
              <Grid item xs={12} sm={6} key={repo.id}>
                <Repository repo={repo} onClose={handleDialogOpen} />
              </Grid>
            )
          })
        }
      </Grid>
    </div>
  );
};

export default Dashboard;
