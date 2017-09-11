export const GET_COLLAPSED = 'GET_COLLAPSED'

export function getCollapsed (collapsed) {
  return {
    type: GET_COLLAPSED,
    collapsed
  }
}

export const GET_POSTVIEW_VISIBLE = 'GET_POSTVIEW_VISIBLE'

export function getPostViewVisible (visible) {
  return {
    type: GET_POSTVIEW_VISIBLE,
    visible
  }
}

export const CHANGE_FILTER = 'CHANGE_FILTER'

export function changeFilter (activeFilter) {
  return {
    type: CHANGE_FILTER,
    activeFilter
  }
}

export const GET_CATEGORIES = 'GET_CATEGORIES'

export function getCategories (categories) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export const GET_POSTS = 'GET_POSTS'

export function getPosts (posts) {
  return {
    type: GET_POSTS,
    posts
  }
}

export const GET_POST = 'GET_POST'

export function getPost (post) {
  return {
    type: GET_POST,
    post
  }
}

export const ADD_POST = 'ADD_POST'

export function addPost (post) {
  return {
    type: ADD_POST,
    post
  }
}

export const DELETE_POST = 'DELETE_POST'

export function deletePost (id) {
  return {
    type: DELETE_POST,
    id
  }
}

export const GET_COMMENTS_BY_POST_ID = 'GET_COMMENTS_BY_POST_ID'

export function getCommentsByPostId (postId, comments) {
  return {
    type: GET_COMMENTS_BY_POST_ID,
    postId,
    comments
  }
}

export const GET_COMMENT = 'GET_COMMENT'

export function getComment (comment) {
  return {
    type: GET_COMMENT,
    comment
  }
}

export const GET_COMMENTVIEW_VISIBLE = 'GET_COMMENTVIEW_VISIBLE'

export function getCommentViewVisible (visible) {
  return {
    type: GET_COMMENTVIEW_VISIBLE,
    visible
  }
}

export const DELETE_COMMENT = 'DELETE_COMMENT'

export function deleteComment (id, parentId) {
  return {
    type: DELETE_COMMENT,
    id,
    parentId
  }
}
