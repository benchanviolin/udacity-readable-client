import React, { Component } from 'react';
//import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';

class Category extends Component {
  render() {
    const { match } = this.props;
    //console.log('Props', this.props);

    return (
      <div>
        <Container fluid={true}>
          <Row>
            <Col
              xs={{ size: 12 }}
              className="category-header"
            >
            {match.params.category}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Category
