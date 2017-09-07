import { combineReducers } from 'redux'

import {
  GET_COLLAPSED,
  GET_CATEGORIES
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

export default combineReducers({
  collapsed,
  category
})
