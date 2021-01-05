import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Redux
import { connect } from 'react-redux';
import { getPost } from '../redux/actions/dataActions';
// mui
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = {
    invisibleSeparator:{
        border: 'none',
        margin: 4
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%',
        top: '11%',
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
}

export class PostDialog extends Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true })
        this.props.getPost(this.props.postId);
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render() {
        const { classes, post: { content, createdAt, userImage, userHandle, likeCount, commentCount, postId },
            ui: { loading } } = this.props;
        
        const dialogContent = loading ? (
            <CircularProgress size={200}/>
        ) : (
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage} />
                </Grid>
                <Grid item sm={7}>
                    <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>@{userHandle}</Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body1">{content}</Typography>
                </Grid>
            </Grid>
        )
        return (
            <Fragment>
                <IconButton onClick={this.handleOpen} tip="Expand Status" className={classes.expandButton}>
                    <UnfoldMore color="secondary"/>
                </IconButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Status</DialogTitle>
                    <IconButton onClick={this.handleClose} tip="Expand Status" className={classes.closeButton}>
                        <CloseIcon color="secondary"/>
                    </IconButton>
                    <DialogContent className={classes.DialogContent}>
                        {dialogContent}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostDialog.propTypes = {
    getPost: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.data.post,
    ui: state.ui
})

const mapActionsToProps = {
    getPost
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog));
