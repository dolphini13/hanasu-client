import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';
// mui
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const styles = {
    form: {
        textAlign: 'center'
      },
      image: {
          margin: '15px auto 15px auto',
          height: 50
      },
      pageTitle: {
          margin: '10px auto 10px auto'
      },
      textField: {
          margin: '10px auto 10px auto'
      },
      button: {
          position: 'relative',
          float: "right"
      },
      errorMsg: {
          color: "red",
          fontSize: '0.8rem'
      },
      progress: {
          position: 'absolute'
      }
}

class EditDetails extends Component {
    state = {
        bio: '',
        link: '',
        location: '',
        open: false
    };

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : "",
            link: credentials.link ? credentials.link : "",
            location: credentials.location? credentials.location : ""
        });
    }

    handleOpen = () => {
        this.setState({ open: true })
        this.mapUserDetailsToState(this.props.credentials);
    }

    handleClose = () => {  
        this.setState({ open: false })
    }

    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            link: this.state.link,
            location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <Tooltip title="Edit details" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color="secondary"/>
                    </IconButton>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Edit Your Profile</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name="bio" type="text" label="About You" multiline rows="3" placeholder="A short bio about you" 
                                className={classes.textField} value={this.state.bio} onChange={this.handleChange} fullWidth />
                            <TextField name="link" type="text" label="Website" placeholder="Your website link" 
                                className={classes.textField} value={this.state.link} onChange={this.handleChange} fullWidth />
                            <TextField name="location" type="text" label="Location" placeholder="Your location" 
                                className={classes.textField} value={this.state.location} onChange={this.handleChange} fullWidth /> 
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="secondary">
                            Submit
                        </Button>                                           
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails));
