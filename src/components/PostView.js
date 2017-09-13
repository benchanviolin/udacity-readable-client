import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../css/Post.css'
import { Container, Row, Col, Button } from 'reactstrap'
import Post from './Post'
import Comment from './Comment'
import { getPostViewVisible } from '../actions'
import Page404 from './Page404'

class PostView extends Component {
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
    const comments = this.props.comments && this.props.comments.byPostId && this.props.comments.byPostId[postId] && this.props.comments.byPostId[postId].rows ? this.props.comments.byPostId[postId].rows : [];
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
              <Button
                onClick={(e) => { this.props.history.goBack(); }}
              >Back</Button>
              </Col>
            </Row>
            <Row className="category-post-row">
              <Col
                xs={{ size: 12 }}
              >
                <Post
                  id={postId}
                  summaryView={false}
                  data={data}
                />
              </Col>
            </Row>
            <Row className="category-post-row">
              <Link
                className="category-add-post"
                to={'/' + data.category + '/' + postId + '/addcomment'}
              >+ Add Comment</Link>
            </Row>
            {comments && (
              <Row className="category-post-row">
                {comments.map((comment, key) => (
                  <Col
                    key={key}
                    sm={{ size: 12 }}
                    md={{ size: 6 }}
                  >
                    <Comment
                      data={comment}
                    />
                  <div className="category-post-after"></div>
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        )}
      </div>
    )
  }
}

function mapStateToProps ({ posts, postViewVisible, comments }) {
  return {
    posts,
    comments,
    postViewVisible
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
