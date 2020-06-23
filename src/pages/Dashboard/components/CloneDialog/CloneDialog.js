import React, { useEffect, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import AssignmentIcon from '@material-ui/icons/Assignment';
import IconButton from '@material-ui/core/IconButton';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import { GlobalContext } from '../../../../contexts/GlobalContext';

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
  urlText: {
    padding: '13.5px 14px'
  }
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  }
}))(MuiDialogContent);

const CloneDialog = withStyles(styles)((props) => {
  const [open, setOpen] = React.useState(props.modalOpen);
  const [useHTTPS, setUseHTTPS] = React.useState(true);
  const [copy, setCopy] = React.useState(false);
  const { repo } = useContext(GlobalContext)
  const { classes } = props;

  useEffect(() => {
    setOpen(props.modalOpen);
  }, [props.modalOpen])

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handleChange = (event) => {
    setUseHTTPS(event.target.checked);
  };

  const handleSnackBarClose = () => {
    setCopy(false);
  };

  return (
    <Dialog fullWidth={true} maxWidth={'xs'} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <Snackbar
        open={copy}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
        message="Copied 😀😀"
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={handleSnackBarClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
      <DialogTitle>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Use HTTPS</Grid>
            <Grid item>
              <Switch
                checked={useHTTPS}
                onChange={handleChange}
                name="cheuseHTTPSckedA"
                inputProps={{ 'aria-label': 'Use HTTPS' }}
              />
            </Grid>
            <Grid item>Use SSH</Grid>
          </Grid>
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        {
          useHTTPS ? <React.Fragment>
            <Typography
              variant="body1">
              Clone with HTTPS
        </Typography>
            <Typography
              variant="caption">
              Use Git or checkout with SVN using the web URL.
          </Typography>
            <Box justifyContent="center" flexDirection="row" display="flex" alignItems="center" mt={2}>

              <TextField InputProps={{
                readOnly: true,
                classes: { input: classes.urlText }
              }} fullWidth value={repo.url + '.git'} variant="outlined" />
              <CopyToClipboard text={repo.url + '.git'}
                onCopy={() => setCopy(true)}>
                <IconButton aria-label="delete">
                  <AssignmentIcon />
                </IconButton>
              </CopyToClipboard>
            </Box>
          </React.Fragment> : <React.Fragment>
              <Typography
                variant="body1">
                Clone with SSH
        </Typography>
              <Typography
                variant="caption">
                Use a password protected SSH key.
          </Typography>
          <Box justifyContent="center" flexDirection="row" display="flex" alignItems="center" mt={2}>

              <TextField InputProps={{
                readOnly: true,
                classes: { input: classes.urlText }
              }} fullWidth value={repo.sshUrl} variant="outlined" />
              <CopyToClipboard text={repo.sshUrl}
                onCopy={() => setCopy(true)}>
                <IconButton aria-label="delete">
                  <AssignmentIcon />
                </IconButton>
              </CopyToClipboard>
            </Box>
            </React.Fragment>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          OK
          </Button>
      </DialogActions>
    </Dialog >
  );
})

CloneDialog.propTypes = {
  history: PropTypes.object
};

export default withRouter(CloneDialog);