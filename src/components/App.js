import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../css/App.css'
import * as ReadableAPI from '../utils/ReadableAPI'
import { getCategories } from '../actions'
import { Navbar, NavbarToggler, NavbarBrand, Collapse, Nav, NavItem, NavLink, Container, Row, Col, Button } from 'reactstrap'; //http://reactstrap.github.io/

class App extends Component {
  state = {
    collapsed: true
  }
  componentDidMount() {
    ReadableAPI.getCategories().then((categories) => {
      this.props.setCategories(categories);
    })
  }
  toggleNavbar() {
    this.setState(state => ({
      collapsed: !state.collapsed
    }));
  }

  render() {
    const { category } = this.props;

    return (
      <div>
        <Navbar color="faded" light toggleable>
         <NavbarToggler right onClick={() => {this.toggleNavbar()}} />
         <NavbarBrand>
           <Link
             className="nav-home"
             to="/"
           >Readable by Ben Chan</Link>
         </NavbarBrand>
         <Collapse isOpen={!this.state.collapsed} navbar>
           <Nav className="ml-auto" navbar>
             {category && category.rows && (category.rows.map((category, key) => {
               return <NavItem key={key}>
                 <NavLink href={'/'+category.name}>{category.name}</NavLink>
               </NavItem>
             }))}
           </Nav>
         </Collapse>
        </Navbar>
        <Route exact path='/' render={() => (
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
        )}/>

        </div>
    );
  }
}

function mapStateToProps ({ category }) {
  return {
    category
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setCategories: (categories) => dispatch(getCategories(categories))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
