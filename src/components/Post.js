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
    readOnly: PropTypes.bool,
    data: PropTypes.object.isRequired
  }
  componentDidMount() {
    ReadableAPI.getCommentsByPostId(this.props.data.id).then((comments) => { this.props.setCommentsByPostId(this.props.data.id, comments); });
  }
  abbreviate(text) {
    if (text.length > 50) {
      return text.substring(0, 50) + '...';
    }
    return text;
  }
  render() {
    const readOnly = this.props.readOnly !== undefined ? this.props.readOnly : true;
    const { id, title, author, body, category, voteScore, timestamp } = this.props.data;
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
            {readOnly
              ? <CardText>{this.abbreviate(body)}</CardText>
              : <CardText>{body}</CardText>
            }
            {readOnly && (
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
          </CardBlock>
        </Card>
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
    setCommentsByPostId: (postId, comments) => dispatch(getCommentsByPostId(postId, comments))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
