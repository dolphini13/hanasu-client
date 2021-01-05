import { SET_POSTS, SET_POST, LOADING_DATA, LIKE_POST, UNLIKE_POST, DELETE_POST, LOADING_UI, SET_ERRORS, POST_POST, CLEAR_ERRORS, STOP_LOADING_UI } from '../types';
import axios from 'axios';

export const getPosts = () => dispatch => {
    dispatch({ type:LOADING_DATA });
    axios.get('/posts')
        .then(res => {
            dispatch({
                type:SET_POSTS,
                payload: res.data
            })
        }).catch(err => {
            console.log(err);
            dispatch({
                type:SET_POSTS,
                payload: []
            })
        })
}

export const getPost = (postId) => dispatch => {
    dispatch({ type:LOADING_UI });
    axios.get(`/posts/${postId}`)
        .then(res => {
            dispatch({
                type: SET_POST,
                payload:res.data
            });
            dispatch({ type: STOP_LOADING_UI })
        }).catch(err => console.log(err));
}

export const postPost = (newPost) => dispatch => {
    dispatch({ type:LOADING_UI });
    axios.post('/posts', newPost)
        .then(res => {
            dispatch({
                type: POST_POST,
                payload: res.data
            })
            dispatch({ type: CLEAR_ERRORS })
        }).catch(err =>{
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const likePost = (postId) => dispatch => {
    axios.get(`/posts/${postId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_POST,
                payload: res.data
            })
        }).catch(err => {
            console.log(err)
        })
}

export const unlikePost = (postId) => dispatch => {
    axios.get(`/posts/${postId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_POST,
                payload: res.data
            })
        }).catch(err => {
            console.log(err)
        })
}

export const deletePost = (postId) => (dispatch) => {
    axios.delete(`/posts/${postId}`)
        .then(() => {
            dispatch({ type: DELETE_POST, payload: postId})            
        }).catch(err => console.log(err));
}

export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS});
}