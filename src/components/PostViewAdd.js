import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../css/Post.css'
import { Container, Row, Col } from 'reactstrap';
import PostAdd from './PostAdd'
import { getPostViewVisible } from '../actions'

class PostViewAdd extends Component {
  static PropTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  componentDidMount() {
    this.props.setPostViewVisible(true);
  }
  componentWillUnmount() {
    this.props.setPostViewVisible(false);
  }
  render () {
    const category = this.props.match && this.props.match.params && this.props.match.params.category ? this.props.match.params.category : '';
    return (
      <div>
        <Container fluid={true}>
          <Row className="category-post-row">
            <Col
              xs={{ size: 12 }}
            >
              <PostAdd
                category={category}
                history={this.props.history}
              />
            </Col>
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

function mapDispatchToProps (dispatch) {
  return {
    setPostViewVisible: (visible) => dispatch(getPostViewVisible(visible))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostViewAdd)
