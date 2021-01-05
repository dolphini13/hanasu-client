import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import DeletePost from './DeletePost';
// redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../redux/actions/dataActions';
// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'
import PostDialog from './PostDialog';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 10,
        marginRight: 10,
        position: 'relative'
    },
    image: {
        minWidth: 200,
        objectFit: 'cover'
    },
    content: {
        padding: 25
    }
}

class Post extends Component {
    likedPost = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.post.postId)) return true;
        else return false;
    }

    likePost = () => {
        this.props.likePost(this.props.post.postId);
    }
    unlikePost = () => {
        this.props.unlikePost(this.props.post.postId);
    }

    render() {
        dayjs.extend(relativeTime)
        const { classes, post : { content, createdAt, userImage, userHandle, likeCount, commentCount, postId },
            user: { authenticated, credentials: { handle } } } = this.props;
        const likeButton = !authenticated ? (
            <Tooltip title="Like" placement="top">
                <IconButton className="button" component={Link} to="/login"  >
                    <FavoriteBorder color="primary"/>
                </IconButton>
            </Tooltip> 
        ) : (
            this.likedPost() ? (
                <Tooltip title="Unlike" placement="top">
                    <IconButton className="button" >
                        <FavoriteIcon color="primary" onClick={this.unlikePost} />
                    </IconButton>
                </Tooltip>                
            ) : (
                <Tooltip title="Like" placement="top">
                    <IconButton className="button" >
                        <FavoriteBorder color="primary" onClick={this.likePost} />
                    </IconButton>
                </Tooltip>     
            )
        )
        const deleteButton = authenticated && userHandle === handle ? (
            <DeletePost postId={postId} />
        ) : null
        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title="Profile Picture" className={classes.image} />
                <span>{deleteButton}</span>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="secondary">{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{content}</Typography>
                    {likeButton}
                    <span>{likeCount}</span>
                    <Tooltip title="Comment" placement="top">
                        <IconButton className="button" >
                            <ChatIcon color="primary" />
                        </IconButton>
                    </Tooltip>   
                    <span>{commentCount}</span>
                </CardContent>
                <PostDialog postId={postId} userHandle={userHandle} />
            </Card>
        )
    }
}


const mapActionsToProps = {
    likePost,
    unlikePost
}

Post.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));
