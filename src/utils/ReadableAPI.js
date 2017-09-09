const api = process.env.REACT_APP_READABLE_API_URL || 'http://localhost:5001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const getCommentsByPostId = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

export const votePost = (postId, option) =>
fetch(`${api}/posts/${postId}`, {
  headers,
  method: 'POST',
  body: JSON.stringify({ option })
}).then(res => res.json())
