import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
// redux
import { connect } from 'react-redux';
import { deletePost } from '../redux/actions/dataActions';
// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

const styles = {
    deleteButton: {
        position: 'absolute',
        left: '87%',
        top: '11%',
    }
}

export class DeletePost extends Component {

    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {  
        this.setState({ open: false });
    }

    deletePost = () => {
        this.props.deletePost(this.props.postId);
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <Tooltip title="Delete Post" placement="top">
                    <IconButton className={classes.deleteButton} >
                        <DeleteOutline color="secondary" onClick={this.handleOpen} />
                    </IconButton>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Are you sure you want to remove this post?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                        <Button onClick={this.deletePost} color="secondary">
                            Delete
                        </Button>                                           
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeletePost.propTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}


export default connect(null, { deletePost })(withStyles(styles)(DeletePost));
