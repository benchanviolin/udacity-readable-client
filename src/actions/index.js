export const GET_COLLAPSED = 'GET_COLLAPSED'

export function getCollapsed (collapsed) {
  return {
    type: GET_COLLAPSED,
    collapsed
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
