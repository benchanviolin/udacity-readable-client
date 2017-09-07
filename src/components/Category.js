import React, { Component } from 'react';
//import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap';
import '../css/Category.css';
import Post from './Post.js'

class Category extends Component {
  render() {
    const { category, post } = this.props;
    //console.log('Props', this.props);

    return (
      <div>
        <Container fluid={true}>
          <Row className="category-post-row">
            {post && post.rows && (post.rows.filter(post => post.category !== category))
              .map((post, key) => {
              return <Col
                key={key}
                xs={{ size: 12 }}
                md={{ size: 6 }}
              >
                <Post
                  data={post}
                />
                <div className="category-post-after"></div>
              </Col>
            })}
          </Row>
        </Container>

      </div>
    )
  }
}

function mapStateToProps ({ post }) {
  return {
    post
  }
}

export default connect(
  mapStateToProps
)(Category)
