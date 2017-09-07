import React, { Component } from 'react';
//import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';
import '../css/Category.css';
import Post from './Post.js'

class Category extends Component {
  render() {
    //const { category } = this.props;
    //console.log('Props', this.props);

    return (
      <div>
        <Container fluid={true}>
          <Row className="category-post-row">
            <Col
              xs={{ size: 12 }}
              sm={{ size: 6 }}
              md={{ size: 4 }}
            >
              <Post
                title="Corn is the most magical fruit of all a a a a"
                author="Ben Chan"
                body="Eat corn because it is the BEST food ever!"
              />
              <div className="category-post-after"></div>
            </Col>
            <Col
              xs={{ size: 12 }}
              sm={{ size: 6 }}
              md={{ size: 4 }}
            >
              <Post
                title="Corn is the most magical fruit of all a a a a"
                author="Ben Chan"
                body="Eat corn because it is the BEST food ever!"
              />
              <div className="category-post-after"></div>
            </Col>
            <Col
              xs={{ size: 12 }}
              sm={{ size: 6 }}
              md={{ size: 4 }}
            >
              <Post
                title="Corn is the most magical fruit of all a a a a"
                author="Ben Chan"
                body="Eat corn because it is the BEST food ever!"
              />
              <div className="category-post-after"></div>
            </Col>
          </Row>
        </Container>

      </div>
    )
  }
}

export default Category
