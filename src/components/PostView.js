import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../css/Post.css'
import { Container, Row, Col } from 'reactstrap';
import Post from './Post'
import { getPostViewVisible } from '../actions'

class PostView extends Component {
  static PropTypes = {
    match: PropTypes.object.isRequired
  }
  componentDidMount() {
    this.props.setPostViewVisible(true);
  }
  componentWillUnmount() {
    this.props.setPostViewVisible(false);
  }
  render () {
    const postId = this.props.match.params.postId;
    const { post } = this.props;
    let readyToRenderPost = false;

    /* find current post, accounting for this being loaded before store is fully initialized */
    let data = {};
    if (post && post.rows) {
      const currentPost = post.rows.filter(post => post.id === postId);
      if (currentPost && currentPost.length > 0) {
        data = currentPost[0];
        readyToRenderPost = true;
      }
    }

    return (
      <div>
        <Container fluid={true}>
          <Row className="category-post-row">
            <Col
              xs={{ size: 12 }}
            >
              {readyToRenderPost && (
                <Post
                  id={postId}
                  summaryView={false}
                  data={data}
                />
              )}
          </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

function mapStateToProps ({ post }) {
  return {
    post
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setPostViewVisible: (visible) => dispatch(getPostViewVisible(visible))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView)
