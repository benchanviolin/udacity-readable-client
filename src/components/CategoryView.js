import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../css/Category.css'
import { Container, Row, Col } from 'reactstrap'
import Category from './Category'
import { getPage404Visible } from '../actions'

class CategoryView extends Component {
  static PropTypes = {
    match: PropTypes.object.isRequired
  }
  componentDidMount() {
    /* For some reason, Page404 gets mounted when I load the URL /react directly.  Why is that?  I think something's wrong with the way I set up the <Switch> in App.js - can you take a look please? */
    this.props.setPage404Visible(false);
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

function mapDispatchToProps (dispatch) {
  return {
    setPage404Visible: (visible) => dispatch(getPage404Visible(visible))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CategoryView)
