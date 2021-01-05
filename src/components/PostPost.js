import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { postPost, clearErrors } from '../redux/actions/dataActions';
// mui
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const styles = {
    form: {
        textAlign: 'center'
      },
      textField: {
          margin: '0px auto 10px auto'
      },
      spinningButton: {
          position: 'relative'
      },
      errorMsg: {
          color: "red",
          fontSize: '0.8rem'
      },
      progressSpinner: {
          position: 'absolute'
      }
}

class PostPost extends Component {
    state = {
        content: '',
        errors: {},
        open: false
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.ui.errors){
            this.setState({
                errors: nextProps.ui.errors
            })
        }
        if(!nextProps.ui.errors && !nextProps.ui.loading) {
            this.setState({body:'', open: false, errors:{}});
        } 
    }
    
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : "",
            link: credentials.link ? credentials.link : "",
            location: credentials.location? credentials.location : ""
        });
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {  
        this.props.clearErrors();
        this.setState({ open: false })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = () => {
        const newPost = {
            content: this.state.content,
        };
        this.props.postPost(newPost);
    }

    render() {
        const {classes, ui: {loading}} = this.props;
        const { errors } = this.state;
        return (
            <Fragment>
                <Tooltip title="Post a Status" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <AddIcon color="secondary"/>
                    </IconButton>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Post A New Status</DialogTitle>
                    <form>
                    <DialogContent>
                            <TextField name="content" type="text" label="Status" multiline rows="3" placeholder="Your status..." 
                                className={classes.textField} value={this.state.content} onChange={this.handleChange} 
                                error={errors.body ? true:false} helperText={errors.body} fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" disabled={loading} className={classes.spinningButton}>
                            {loading && (<CircularProgress size={30} className={classes.progressSpinner}/>)}
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="secondary" disabled={loading} className={classes.spinningButton}>
                            {loading && (<CircularProgress size={30} className={classes.progressSpinner}/>)}
                            Submit
                        </Button>                                           
                    </DialogActions>
                    </form>
                </Dialog>
            </Fragment>
        )
    }
}

PostPost.propTypes = {
    postPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    ui: state.ui
})

export default connect(mapStateToProps, {postPost, clearErrors})(withStyles(styles)(PostPost));
