import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../css/Category.css'
import { Container, Row, Col } from 'reactstrap'
import Category from './Category'

class CategoryView extends Component {
  static PropTypes = {
    match: PropTypes.object.isRequired
  }
  render () {
    const category = this.props.match.path.slice(1); /* TODO: Can you explain a better way to detect the active category besides taking the URL and removing the leading / ? */
    const categoryClassName = 'category-header category-header-' + category;
    const title = category;

    return (
      <div>        
        <Container fluid={true}>
          <Row className="category-post-row">
            <Link
              className="category-add-post"
              to={'/' + category + '/addpost'}
            >+ Add Post</Link>
          </Row>
          <Row>
            <Col
              xs={{ size: 12 }}
              className={categoryClassName}
            >
            {title}
            </Col>
          </Row>
        </Container>
        <Category category={category} />
      </div>
    )
  }
}

export default CategoryView
