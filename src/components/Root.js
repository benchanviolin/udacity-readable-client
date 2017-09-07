import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Root.css'
import Filter from './Filter'
import Post from './Post'

class Root extends Component {
  render () {
    const { post } = this.props;
    return (
      <div>
        <Filter />
        {post && post.rows && (post.rows.map((post, key) => {
          return <Post
            key={key}
            post={post}
          />
        }))}
      </div>
    )
  }
}

function mapStateToProps ({ post }) {
  return {
    post
  }
}

export default connect(
  mapStateToProps
)(Root)
