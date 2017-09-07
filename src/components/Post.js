import React, { Component } from 'react';
//import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';
import '../css/Post.css';

class Post extends Component {
  render() {
    const className = 'post-header';
    //console.log('Props', this.props);

    return (
      <div>
        <Container fluid={true}>
          <Row>
            <Col
              xs={{ size: 12 }}
              className={className}
            >
            POST
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Post
