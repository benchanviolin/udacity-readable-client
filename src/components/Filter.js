import React from 'react'
import { Container, Row, Col } from 'reactstrap'; //http://reactstrap.github.io/
import '../css/Filter.css'

const Filter = () => (
  <Container fluid={true}>
    <Row>
      <Col
        xs={{ size: 12 }}
        className="filter-body text-center"
      >
      [ FILTERS HERE ]
      </Col>
    </Row>
  </Container>
)

export default Filter
