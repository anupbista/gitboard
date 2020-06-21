import React, { useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Box } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import * as moment from 'moment';
import Button from '@material-ui/core/Button';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import GetAppIcon from '@material-ui/icons/GetApp';
import theme from '../../../../theme';
import { GlobalContext } from '../../../../contexts/GlobalContext';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    borderWidth: 1,
    borderColor: theme.palette.secondary.light,
    borderStyle: 'solid',
    '&:hover':{
      backgroundColor: "#f8f8f8"
    }
  },
  content: {
    '&:last-child': {
      paddingBottom: 16
    }
  },
  item: {
    width: '100%'
  },
  title: {
    fontWeight: 500,
    fontSize: 16
  },
  langchip: {
    fontSize: 10,
    marginRight: theme.spacing(1)
  },
  repoType: {
    marginLeft: theme.spacing(1),
    height: '22px',
    fontSize: '10px',
    display: 'flex',
    alignSelf: 'flex-start',
    marginBottom: theme.spacing(1)
  }
}));

const Repository = props => {
  const { className, repo, name, icon, ...rest } = props;
  const classes = useStyles();
  const { setRepo } = useContext(GlobalContext);

  const handleCloneClick = (repo) => {
    setRepo(repo);
    props.onClose();
  }
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      {/* <a href={repo.url} target="_blank"> */}
      <CardContent className={classes.content}>
        <Grid
          container
          justify="flex-start"
        >
          <Grid item className={classes.item}>
            <Box justifyContent="flex-start" flexDirection="row" display="flex" alignItems="center">
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                {repo.name}
              </Typography>
              <Chip label={repo.isPrivate ? 'Private' : 'Public'} className={classes.repoType} variant="outlined" />
              {
                repo.isFork && <Chip label="Forked" className={classes.repoType} variant="outlined" />
              }
            </Box>
            <Typography variant="body2">{repo.description}</Typography>
            <Box justifyContent="flex-start" flexDirection="row" display="flex" alignItems="center" mt={2}>
              {
                repo.languages.nodes.map(lang => {
                  return (
                    <Chip key={lang.id} label={lang.name} className={classes.langchip} style={{ backgroundColor: lang.color, color: '#fff' }} />
                  )
                })
              }
            </Box>
            <Box justifyContent="flex-end" flexDirection="row" display="flex" alignItems="center" mt={2}>
              <Typography variant="caption">Updated at: {moment(repo.updatedAt).format('LL')}</Typography>
            </Box>
            <Box justifyContent="flex-end" flexDirection="row" display="flex" alignItems="center" mt={2}>
            <Button size="small" variant="outlined" color="primary" href={repo.url} target="_blank" startIcon={<OpenInNewIcon />}>
              Open
            </Button>
            <Button size="small" variant="outlined" color="default" style={{backgroundColor: theme.palette.success.main, color: theme.palette.white, marginLeft: theme.spacing(1)}} onClick={ () => handleCloneClick(repo)} startIcon={<GetAppIcon />}>
              Clone
            </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      {/* </a> */}
    </Card>
  );
};

Repository.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Repository;
