import { SET_POSTS, SET_POST, LOADING_DATA, LIKE_POST, UNLIKE_POST, DELETE_POST, POST_POST } from '../types';

const initialState = {
    posts: [],
    post: {},
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case SET_POST:
            return {
                ...state,
                post: action.payload,
            };
        case LIKE_POST:
        case UNLIKE_POST: 
            let index = state.posts.findIndex((post) => post.postId === action.payload.postId);
            state.posts[index] = action.payload;
            return {
                ...state
            };
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case DELETE_POST:
            let deleteIndex = state.posts.findIndex(post => post.postId === action.payload);
            state.posts.splice(deleteIndex, 1);
            return {
                ...state
            };
        case POST_POST:
            return {
                ...state,
                posts: [
                    action.payload,
                    ...state.posts 
                ]
            }
        default: 
            return state;
    }
}