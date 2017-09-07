import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../css/App.css'
import * as ReadableAPI from '../utils/ReadableAPI'
import { getCategories } from '../actions'
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, Container, Row, Col } from 'reactstrap'; //http://reactstrap.github.io/
import Category from '../components/Category'

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
      <BrowserRouter>
        <div>
          <Navbar color="faded" light toggleable>
           <NavbarToggler right onClick={() => {this.toggleNavbar()}} />
           <Link
             to="/"
             className="nav-home"
           >Readable by Ben Chan</Link>
           <Collapse isOpen={!this.state.collapsed} navbar>
             <Nav className="ml-auto" navbar>
               {category && category.rows && (category.rows.map((category, key) => {
                 return <NavItem key={key}>
                   <Link
                     to={'/'+category.name}
                     className="nav-category"
                   >{category.name}</Link>
                 </NavItem>
               }))}
             </Nav>
           </Collapse>
          </Navbar>

          <Route exact path='/:category' component={Category}></Route>

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
      </BrowserRouter>
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
