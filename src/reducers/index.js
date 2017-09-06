import { combineReducers } from 'redux'

import {
  GET_CATEGORIES
} from '../actions'

function category (state = initialCategoryState, action) {
  switch (action.type) {
    case GET_CATEGORIES :
      return {
        ...state,
        categories: action.categories
      }
    default :
      return state
  }
}

const initialCategoryState = {
}

export default combineReducers({
  category
})
