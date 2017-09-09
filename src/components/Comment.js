import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Timestamp from 'react-timestamp'
import { Link } from 'react-router-dom'
import { getCommentsByPostId, getPost, deletePost } from '../actions'
import { Card, CardBlock, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import '../css/Comment.css';
import * as ReadableAPI from '../utils/ReadableAPI'
import * as Abbreviate from '../utils/Abbreviate'
import * as ToSeconds from '../utils/ToSeconds'

class Comment extends Component {
  static propTypes = {
    summaryView: PropTypes.bool,
    data: PropTypes.object.isRequired
  }
  componentDidMount() {
    /* When this post is loaded directly by URL, Store.post may not be available yet.  But it should re-render when post does become available, then it will call this. */
    ReadableAPI.getCommentsByPostId(this.props.data.id).then(comments => { this.props.setCommentsByPostId(this.props.data.id, comments); });
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
    const { id, parentId, author, body, voteScore } = this.props.data;
    const timestamp = ToSeconds.toSeconds(this.props.data.timestamp);

    return (
      <div>
        <Card>
          <CardBlock>
            <div className="post-vote">
              <div>
                Votes: {voteScore}
              </div>
              <div>
                <Button
                  id={id}
                  className="post-vote-button"
                  onClick={(e) => { this.upVote(e.target.id) }}
                >+</Button>
                <Button
                  id={id}
                  className="post-vote-button"
                  onClick={(e) => { this.downVote(e.target.id) }}
                >-</Button>
              </div>
            </div>
            <CardSubtitle className="post-author">
              <span>{author + ' [' + category + ']'}</span>
              &nbsp;-&nbsp;
              <Timestamp time={timestamp} format="full" />
            </CardSubtitle>
            <br></br>
            <CardText><pre>{body}</pre></CardText>
            <div className="post-buttons-right">
              <Link
                to={'/' + category + '/' + id + '/edit'}
                ><Button className="post-button">Edit</Button>
              </Link>
              <Button
                id={id}
                className="post-button"
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
