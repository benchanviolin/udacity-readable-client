import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Timestamp from 'react-timestamp'
import { Link } from 'react-router-dom'
import { getCommentsByPostId, getPost, deletePost } from '../actions'
import { Card, CardBlock, CardSubtitle, CardText, Button } from 'reactstrap';
import '../css/Comment.css';
import * as ReadableAPI from '../utils/ReadableAPI'
import * as ToSeconds from '../utils/ToSeconds'

class Comment extends Component {
  static propTypes = {
    summaryView: PropTypes.bool,
    data: PropTypes.object.isRequired
  }
  upVote(id) { this.vote(id, 'upVote'); }
  downVote(id) { this.vote(id, 'downVote'); }
  vote(id, option) {
    ReadableAPI.voteComment(id, option).then(comment => {
      this.props.setComment(comment);
    });
  }
  delete(id) {
    ReadableAPI.deleteComment(id).then(() => {
      this.props.deleteComment(id);
    });
  }
  render() {
    const { id, author, body, voteScore } = this.props.data;
    const timestamp = ToSeconds.toSeconds(this.props.data.timestamp);

    return (
      <div>
        <Card>
          <CardBlock>
            <div className="comment-vote">
              <div>
                Votes: {voteScore}
              </div>
              <div>
                <Button
                  id={id}
                  className="comment-vote-button"
                  onClick={(e) => { this.upVote(e.target.id) }}
                >+</Button>
                <Button
                  id={id}
                  className="comment-vote-button"
                  onClick={(e) => { this.downVote(e.target.id) }}
                >-</Button>
              </div>
            </div>
            <CardSubtitle className="comment-author">
              <span>{author}</span>
              <br></br>
              <Timestamp time={timestamp} format="full" />
            </CardSubtitle>
            <br></br>
            <br></br>
            <CardText className="comment-body">{body}</CardText>
            <div className="comment-buttons-right">
              <Link
                to={'/comment/' + id + '/edit'}
                ><Button className="comment-button">Edit</Button>
              </Link>
              <Button
                id={id}
                className="comment-button"
                onClick={e => { this.delete(e.target.id) }}
              >Delete</Button>
            </div>
            <div className="clearfix"></div>
          </CardBlock>
        </Card>
      </div>
    )
  }
}

function mapStateToProps ({ posts, comments }) {
  return {
    posts,
    comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)
