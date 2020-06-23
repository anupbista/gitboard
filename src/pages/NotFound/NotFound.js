import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  image: {
    display: 'inline-block',
    maxWidth: '100%',
    width: '40%'
  },
  text: {
    marginTop: 30
  },
  textsmall: {
    marginTop: 20
  },
  button:{
    marginTop: 50
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        spacing={4}
      >
        <Grid
          item
          lg={6}
          xs={12}
        >
          <div className={classes.content}>
            <img
              alt="Under development"
              className={classes.image}
              src="/assets/not_found.svg"
            />
             <Typography variant="h1" className={classes.text}>
              Oops!
            </Typography>
            <Typography variant="h4" className={classes.textsmall}>
              We can't seem to find the page you're looking for.
            </Typography>
            <Button className={classes.button} component={Link} to="/" variant="contained" color="primary">
              Go to Gitboard search
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
