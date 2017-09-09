import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap';
import '../css/Root.css'
import '../css/Category.css'
import Post from './Post'

class Root extends Component {
  render () {
    const { posts } = this.props;
    return (
      <div>
        <Container fluid={true}>
          <Row className="category-post-row">
            {posts && posts.rows && (posts.rows.map((post, key) => {
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
            }))}
          </Row>
        </Container>
      </div>
    )
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts
  }
}

export default connect(
  mapStateToProps
)(Root)
