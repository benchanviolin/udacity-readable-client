import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Timestamp from 'react-timestamp'
import { Link } from 'react-router-dom'
import { Card, CardBlock, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import '../css/Post.css';

class Post extends Component {
  static propTypes = {
    readOnly: PropTypes.bool,
    data: PropTypes.object.isRequired
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
              {!readOnly && (
                <div>
                  <Button className="post-vote-button">+</Button>
                  <Button>-</Button>
                </div>
              )}
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
            {readOnly
              ? <div>
                  <Link to={'/' + category + '/' + id}>
                    <Button className="float-right">View</Button>
                  </Link>
                </div>
              : <div>
                  <Button className="float-left">Edit</Button>
                  <Button className="float-right">Delete</Button>
                </div>
            }
          </CardBlock>
        </Card>
      </div>
    )
  }
}

export default Post
