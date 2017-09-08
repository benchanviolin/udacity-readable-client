import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'; //http://reactstrap.github.io/
import '../css/Filter.css'

class Filter extends Component {
  render() {
    return <Container fluid={true}>
      <Row>
        <Col
          xs={{ size: 12 }}
          className="filter-body text-center"
        >
          Sort By:
          &nbsp;
          <select>
            <option value="vote-asc">Votes High-low</option>
            <option value="vote-desc">Votes Low-high</option>
            <option value="date-asc">Date New-old</option>
            <option value="date-desc">Date Old-new</option>
          </select>
        </Col>
      </Row>
    </Container>
  }
}

export default Filter
