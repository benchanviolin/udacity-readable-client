import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../css/Category.css'
import { Container, Row, Col } from 'reactstrap';
import Filter from './Filter'
import Category from './Category'

class CategoryView extends Component {
  static PropTypes = {
    match: PropTypes.object.isRequired
  }
  render () {
    const category = this.props.match.params.category;
    const categoryClassName = 'category-header category-header-' + category;
    const title = category;

    return (
      <div>
        <Filter />
        <div className="category-view-space"></div>
        <Container fluid={true}>
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

function mapStateToProps ({ post }) {
  return {
    post
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryView)
