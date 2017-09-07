import React from 'react'
import { Container, Row, Col } from 'reactstrap'; //http://reactstrap.github.io/

const Home = () => (
  <Container fluid={true}>
    <Row>
      <Col
        xs={{ size: 12 }}
        className="home-readme text-right"
      >
      Click on a category above to begin!
      </Col>
    </Row>
  </Container>
)

export default Home
