import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../css/Comment.css'
import { Container, Row, Col } from 'reactstrap'
import CommentAdd from './CommentAdd'
import { getCommentViewVisible } from '../actions'

class CommentViewAdd extends Component {
  static PropTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  componentDidMount() {
    this.props.setCommentViewVisible(true);
  }
  componentWillUnmount() {
    this.props.setCommentViewVisible(false);
  }
  render () {
    const { postId } = this.props.match.params;
    return (
      <div>
        <Container fluid={true}>
          <Row className="category-comment-row">
            <Col
              xs={{ size: 12 }}
            >
              <CommentAdd                
                history={this.props.history}
                parentId={postId}
              />
            </Col>
          </Row>
        </Container>
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
    setCommentViewVisible: (visible) => dispatch(getCommentViewVisible(visible))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentViewAdd)
