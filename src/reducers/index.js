import { combineReducers } from 'redux'

import {
  GET_COLLAPSED,
  GET_POSTVIEW_VISIBLE,
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

const initialPostViewVisibleState = false;

function postViewVisible (state = initialPostViewVisibleState, action) {
  switch (action.type) {
    case GET_POSTVIEW_VISIBLE :
      return action.visible;
    default :
      return state;
  }
}

const initialCategoriesState = {}

function categories (state = initialCategoriesState, action) {
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

const initialPostsState = {}

function posts (state = initialPostsState, action) {
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

const initialCommentsState = {}

function comments (state = initialCommentsState, action) {
  switch (action.type) {
    case GET_COMMENTS_BY_POST_ID :
      return {
        ...state,
        byPostId: {
          ...state.byPostId,
          [action.postId]: {
            rows: action.comments
          }
        }
      };
    default :
      return state;
  }
}

export default combineReducers({
  collapsed,
  postViewVisible,
  categories,
  posts,
  comments
})
