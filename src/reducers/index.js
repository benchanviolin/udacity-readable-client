import { combineReducers } from 'redux'

import {
  GET_COLLAPSED,
  GET_POSTVIEW_VISIBLE,
  CHANGE_FILTER,
  GET_CATEGORIES,
  GET_POSTS,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  GET_COMMENTS_BY_POST_ID,
  GET_COMMENT,
  GET_COMMENTVIEW_VISIBLE,
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_PAGE404_VISIBLE
} from '../actions/types'

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
      return {
        ...state,
        rows: state.rows.map(post => post.id === action.post.id ? action.post : post)
      }
    case ADD_POST:
      return {
        ...state,
        rows: state.rows.concat([ action.post ])
      }
    case DELETE_POST:
      return {
        ...state,
        rows: state.rows.filter(post => post.id !== action.id)
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
            rows: action.comments.filter(comment => comment.deleted === false)
          }
        }
      };
    case GET_COMMENT:
      return {
        ...state,
        byPostId: {
          ...state.byPostId,
          [action.comment.parentId]: {
            rows: state.byPostId[action.comment.parentId].rows.map(comment => comment.id === action.comment.id ? action.comment : comment)
          }
        }
      }
    case ADD_COMMENT:
      return {
        ...state,
        byPostId: {
          ...state.byPostId,
          [action.parentId]: {
            rows: state.byPostId && state.byPostId[action.comment.parentId] && state.byPostId[action.comment.parentId].rows ? state.byPostId[action.comment.parentId].rows.concat([ action.comment ]) : [ action.comment ]
          }
        }
      }
    case DELETE_COMMENT:
      return {
        ...state,
        byPostId: {
          ...state.byPostId,
          [action.parentId]: {
            rows: state.byPostId[action.parentId].rows.filter(comment => comment.id !== action.id)
          }
        }
      }
    default :
      return state;
  }
}

const initialCommentViewVisibleState = false;

function commentViewVisible (state = initialCommentViewVisibleState, action) {
  switch (action.type) {
    case GET_COMMENTVIEW_VISIBLE :
      return action.visible;
    default :
      return state;
  }
}

const initialPage404VisibleState = false;

function page404Visible (state = initialPage404VisibleState, action) {
  switch (action.type) {
    case GET_PAGE404_VISIBLE :
      return action.visible;
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
  comments,
  commentViewVisible,
  page404Visible
})
