import React, { Component } from 'react';
import PropTypes from 'prop-types';
// redux
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';
// MUI
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
// Components
import Post from '../components/Post';
import Profile from '../components/Profile';

export class home extends Component {

    componentDidMount() {
        this.props.getPosts()
    }

    render() {
        const { posts, loading } = this.props.data
        let loadedPosts = !loading ? (
            posts.map(post => <Post key={post.postId} post={post}/>)
        ) : <CircularProgress />
        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {loadedPosts}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile></Profile>
                </Grid>
            </Grid>
        )
    }
}

const mapActionsToProps = {
    getPosts
}

home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, mapActionsToProps)(home);
