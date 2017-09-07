import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../css/Post.css'
import { Container, Row, Col } from 'reactstrap';
import Post from './Post'

class PostView extends Component {
  static PropTypes = {
    match: PropTypes.object.isRequired
  }
  render () {
    console.log(this.props);
    const postId = this.props.match.params.postId;

    return (
      <div>
        {postId}
      </div>
    )
  }
}

function mapStateToProps ({ postView }) {
  return {
    postView
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView)
