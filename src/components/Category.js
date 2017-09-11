import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import '../css/Category.css'
import Post from './Post.js'
import * as SortPosts from '../utils/SortPosts'

class Category extends Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
  }
  render() {
    const { category, filters } = this.props;
    const posts = SortPosts.sortPosts(this.props.posts, filters);    

    return (
      <div>
        <Container fluid={true}>
          <Row className="category-post-row">
            {posts && posts.rows && (posts.rows.filter(post => post.category === category))
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

function mapStateToProps ({ posts }) {
  return {
    posts
  }
}

export default connect(
  mapStateToProps
)(Category)
