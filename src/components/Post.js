import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Timestamp from 'react-timestamp'
import { Link } from 'react-router-dom'
import { getCommentsByPostId } from '../actions'
import { Card, CardBlock, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import '../css/Post.css';
import * as ReadableAPI from '../utils/ReadableAPI'

class Post extends Component {
  static propTypes = {
    summaryView: PropTypes.bool,
    data: PropTypes.object.isRequired
  }
  componentDidMount() {
    /* When this post is loaded directly by URL, Store.post may not be available yet.  But it should re-render when post does become available, then it will call this. */
    ReadableAPI.getCommentsByPostId(this.props.data.id).then((comments) => { this.props.setCommentsByPostId(this.props.data.id, comments); });
  }
  abbreviate(text) {
    if (text.length > 50) {
      return text.substring(0, 50) + '...';
    }
    return text;
  }
  render() {
    const summaryView = this.props.summaryView !== undefined ? this.props.summaryView : true;
    const { comments } = this.props;
    const { id, title, author, body, category, voteScore, timestamp } = this.props.data;
    const commentCount = comments && comments.byPostId && comments.byPostId[id] && comments.byPostId[id].rows ? comments.byPostId[id].rows.length : 0;
    //console.log('Props', this.props);

    return (
      <div>
        <Card>
          <CardBlock>
            <div className="post-vote">
              <div>
                Votes: {voteScore}
              </div>
              <div>
                <Button className="post-vote-button">+</Button>
                <Button>-</Button>
              </div>
            </div>
            <CardTitle className="post-title">{title}</CardTitle>
            <CardSubtitle className="post-author">
              <span>{author + ' [' + category + ']'}</span>
              &nbsp;-&nbsp;
              <Timestamp time={timestamp} format="full" />
            </CardSubtitle>
            <br></br>
            {summaryView
              ? <CardText>{this.abbreviate(body)}</CardText>
              : <CardText>{body}</CardText>
            }
            {summaryView && (
              <div className="post-buttons-left">
                <Link
                  to={'/' + category + '/' + id}
                  ><Button className="post-button">View</Button>
                </Link>
              </div>
            )}
            <div className="post-buttons-right">
              <Button className="post-button">Edit</Button>
              <Button className="post-button">Delete</Button>
            </div>
            <div className="clearfix"></div>
            <br></br>
            <div className="post-comment-count">Comments: {commentCount}</div>
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
    setCommentsByPostId: (postId, comments) => dispatch(getCommentsByPostId(postId, comments))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
