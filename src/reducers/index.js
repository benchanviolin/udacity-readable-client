import { combineReducers } from 'redux'

import {
  GET_COLLAPSED,
  GET_POSTVIEW_VISIBLE,
  CHANGE_FILTER,
  GET_CATEGORIES,
  GET_POSTS,
  GET_POST,
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

const initialFiltersState = {
  rows: [
    {
      'id': 'votes-asc',
      'title': 'Votes Low-high',
      'sortByFields': ['voteScore', '-timestamp']
    },
    {
      'id': 'votes-desc',
      'title': 'Votes High-low',
      'sortByFields': ['-voteScore', '-timestamp']
    },
    {
      'id': 'date-asc',
      'title': 'Date Old-new',
      'sortByFields': ['timestamp', '-voteScore']
    },
    {
      'id': 'date-desc',
      'title': 'Date New-old',
      'sortByFields': ['-timestamp', '-voteScore']
    },
  ],
  activeFilter: 'votes-desc'
};

function filters (state = initialFiltersState, action) {
  switch (action.type) {
    case CHANGE_FILTER :
      return {
        ...state,
        activeFilter: action.activeFilter
      };
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
        rows: action.posts.filter(post => post.deleted === false)
      };
    case GET_POST:
      //console.log(state.rows);
      //console.log(action.post);
      return {
        ...state,
        rows: state.rows.map(post => post.id === action.post.id ? action.post : post)        
      }
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
  filters,
  categories,
  posts,
  comments
})
