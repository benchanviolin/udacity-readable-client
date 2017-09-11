import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../css/Comment.css'
import { Container, Row, Col } from 'reactstrap'
import CommentEdit from './CommentEdit'
import { getCommentViewVisible, getCommentsByPostId } from '../actions'
import * as ReadableAPI from '../utils/ReadableAPI'

class CommentViewEdit extends Component {
  static PropTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  componentDidMount() {
    this.props.setCommentViewVisible(true);
    //need to load this comment just in case we start on this URL directly
    const { postId } = this.props.match.params;
    const { comments } = this.props;
    if (comments && comments.byPostId && comments.byPostId[postId] && comments.byPostId[postId].rows) {
    } else {
      ReadableAPI.getCommentsByPostId(postId).then(comments => { this.props.setCommentsByPostId(postId, comments); });
    }
  }
  componentWillUnmount() {
    this.props.setCommentViewVisible(false);
  }
  render () {
    const { postId, commentId } = this.props.match.params;
    const { comments } = this.props;
    let readyToRender = false;

    /* find current comment, accounting for this being loaded before store is fully initialized */
    /* TODO: Can you explain a better way to do this? */
    let data = {};    
    if (comments && comments.byPostId && comments.byPostId[postId] && comments.byPostId[postId].rows) {
      const currentComment = comments.byPostId[postId].rows.filter(comment => comment.id === commentId);
      if (currentComment && currentComment.length > 0) {
        data = currentComment[0];
        readyToRender = true;
      }
    }

    return (
      <div>
        {readyToRender && (
          <Container fluid={true}>
            <Row className="category-comment-row">
              <Col
                xs={{ size: 12 }}
              >
                <CommentEdit
                  id={commentId}
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

function mapStateToProps ({ comments }) {
  return {
    comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setCommentsByPostId: (postId, comments) => dispatch(getCommentsByPostId(postId, comments)),
    setCommentViewVisible: (visible) => dispatch(getCommentViewVisible(visible))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentViewEdit)
