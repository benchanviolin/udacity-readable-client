import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Timestamp from 'react-timestamp'
import { Link } from 'react-router-dom'
import { getCommentsByPostId, getPost } from '../actions'
import { Card, CardBlock, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import '../css/Post.css';
import * as ReadableAPI from '../utils/ReadableAPI'
import * as Abbreviate from '../utils/Abbreviate'

class Post extends Component {
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
    console.log('vote: post', id, option);
    ReadableAPI.votePost(id, option).then(post => {
      this.props.setPost(post);
    })
  }
  render() {
    const summaryView = this.props.summaryView !== undefined ? this.props.summaryView : true;
    const { comments } = this.props;
    const { id, title, author, category, body, voteScore, timestamp } = this.props.data;
    //const body = this.props.data.body.replace(new RegExp('\n'), '<br>');
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
            <CardTitle className="post-title">{title}</CardTitle>
            <CardSubtitle className="post-author">
              <span>{author + ' [' + category + ']'}</span>
              &nbsp;-&nbsp;
              <Timestamp time={timestamp} format="full" />
            </CardSubtitle>
            <br></br>
            {summaryView
              ? <CardText>{Abbreviate.abbreviate(body)}</CardText>
              : <CardText><pre>{body}</pre></CardText>
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
              <Link
                to={'/' + category + '/' + id + '/edit'}
                ><Button className="post-button">Edit</Button>
              </Link>
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
    setCommentsByPostId: (postId, comments) => dispatch(getCommentsByPostId(postId, comments)),
    setPost: (post) => dispatch(getPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
