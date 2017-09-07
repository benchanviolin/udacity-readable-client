import React, { Component } from 'react';
//import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';
import '../css/Category.css';

class Category extends Component {
  render() {
    const category = this.props.match.params.category;
    const className = 'category-header category-header-' + category;
    const title = category;
    //console.log('Props', this.props);

    return (
      <div>
        <Container fluid={true}>
          <Row>
            <Col
              xs={{ size: 12 }}
              className={className}
            >
            {title}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Category
