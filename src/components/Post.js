import React, { Component } from 'react';
//import { Link } from 'react-router-dom'
import { Card, CardBlock, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import '../css/Post.css';

class Post extends Component {
  render() {
    const { title, author, body } = this.props;
    //console.log('Props', this.props);

    return (
      <div>
        <Card>
          <CardBlock>
            <CardTitle>{title}</CardTitle>
            <CardSubtitle>{'By '+author}</CardSubtitle>
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
