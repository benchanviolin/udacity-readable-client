import * as types from './types';

export function getCollapsed (collapsed) {
  return {
    type: types.GET_COLLAPSED,
    collapsed
  }
}

export function getPostViewVisible (visible) {
  return {
    type: types.GET_POSTVIEW_VISIBLE,
    visible
  }
}

export function changeFilter (activeFilter) {
  return {
    type: types.CHANGE_FILTER,
    activeFilter
  }
}

export function getCategories (categories) {
  return {
    type: types.GET_CATEGORIES,
    categories
  }
}

export function getPosts (posts) {
  return {
    type: types.GET_POSTS,
    posts
  }
}

export function getPost (post) {
  return {
    type: types.GET_POST,
    post
  }
}

export function addPost (post) {
  return {
    type: types.ADD_POST,
    post
  }
}

export function deletePost (id) {
  return {
    type: types.DELETE_POST,
    id
  }
}

export function getCommentsByPostId (postId, comments) {
  return {
    type: types.GET_COMMENTS_BY_POST_ID,
    postId,
    comments
  }
}

export function getComment (comment) {
  return {
    type: types.GET_COMMENT,
    comment
  }
}

export function getCommentViewVisible (visible) {
  return {
    type: types.GET_COMMENTVIEW_VISIBLE,
    visible
  }
}

export function deleteComment (id, parentId) {
  return {
    type: types.DELETE_COMMENT,
    id,
    parentId
  }
}

export function addComment (comment) {
  return {
    type: types.ADD_COMMENT,
    comment
  }
}

export function getPage404Visible (visible) {
  return {
    type: types.GET_PAGE404_VISIBLE,
    visible
  }
}
