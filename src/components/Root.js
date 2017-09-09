import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap';
import '../css/Root.css'
import '../css/Category.css'
import Post from './Post'
import * as SortPosts from '../utils/SortPosts'

class Root extends Component {
  render () {
    const { filters } = this.props;
    const posts = SortPosts.sortPosts(this.props.posts, filters);
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

function mapStateToProps ({ posts, filters }) {
  return {
    posts,
    filters
  }
}

export default connect(
  mapStateToProps
)(Root)
