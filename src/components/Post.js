import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Timestamp from 'react-timestamp'
//import { Link } from 'react-router-dom'
import { Card, CardBlock, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import '../css/Post.css';

class Post extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    const { title, author, body, category, voteScore, timestamp } = this.props.data;
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
              <span>{author+' ['+category+']'}</span>
              <Timestamp time={timestamp} format="full" />
            </CardSubtitle>
            <br></br>
            <CardText>{body}</CardText>
            <Button className="float-left">Edit</Button>
            <Button className="float-right">Delete</Button>
          </CardBlock>
        </Card>
      </div>
    )
  }
}

export default Post
