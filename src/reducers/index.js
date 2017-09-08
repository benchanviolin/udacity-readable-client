import { combineReducers } from 'redux'

import {
  GET_COLLAPSED,
  GET_CATEGORIES,
  GET_POSTS,
  GET_COMMENTS_BY_POST_ID
} from '../actions'

const initialCollapsedState = true;

function collapsed (state = initialCollapsedState, action) {
  switch (action.type) {
    case GET_COLLAPSED :
      return action.collapsed;
    default :
      return state;
  }
}

const initialCategoryState = {}

function category (state = initialCategoryState, action) {
  switch (action.type) {
    case GET_CATEGORIES :
      return {
        ...state,
        rows: action.categories
      };
    default :
      return state;
  }
}

const initialPostState = {}

function post (state = initialPostState, action) {
  switch (action.type) {
    case GET_POSTS :
      return {
        ...state,
        rows: action.posts
      };
    default :
      return state;
  }
}

const initialCommentState = {}

function comment (state = initialCommentState, action) {
  switch (action.type) {
    case GET_COMMENTS_BY_POST_ID :
      return {
        ...state,
        rows: {
          ...state.rows,
          [action.postId]: {
            comments: action.comments
          }
        }
      };
    default :
      return state;
  }
}

export default combineReducers({
  collapsed,
  category,
  post,
  comment
})
