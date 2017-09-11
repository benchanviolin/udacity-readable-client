import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../css/Post.css'
import { Container, Row, Col } from 'reactstrap'
import PostEdit from './PostEdit'
import { getPostViewVisible } from '../actions'

class PostViewEdit extends Component {
  static PropTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  componentDidMount() {
    this.props.setPostViewVisible(true);
  }
  componentWillUnmount() {
    this.props.setPostViewVisible(false);
  }
  render () {
    const postId = this.props.match.params.postId;
    const { posts } = this.props;
    let readyToRender = false;

    /* find current post, accounting for this being loaded before store is fully initialized */
    /* TODO: Can you explain a better way to do this? */
    let data = {};
    if (posts && posts.rows) {
      const currentPost = posts.rows.filter(post => post.id === postId);
      if (currentPost && currentPost.length > 0) {
        data = currentPost[0];
        readyToRender = true;
      }
    }

    return (
      <div>
        {readyToRender && (
          <Container fluid={true}>
            <Row className="category-post-row">
              <Col
                xs={{ size: 12 }}
              >
                <PostEdit
                  id={postId}
                  data={data}
                  history={this.props.history}
                />
              </Col>
            </Row>
          </Container>
        )}
      </div>
    )
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts
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
)(PostViewEdit)
