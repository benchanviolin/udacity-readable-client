import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Navbar, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap'
import '../css/Menu.css'
import { getCollapsed } from '../actions'

class Menu extends Component {
  toggleNavbar() {
    /*this.setState(state => ({
      collapsed: !state.collapsed
    }));*/ /* This is how I would do it if the rubric didn't force me to put everything in the Redux store */
    this.props.setCollapsed(!this.props.collapsed);
  }

  render () {
    const { categories, collapsed } = this.props;
    return (
      <Navbar color="dark" light className="menu-navbar" toggleable>
       <NavbarToggler right onClick={() => {this.toggleNavbar()}} />
       <Link
         to="/"
         className="menu-home"
       >Readable by Ben Chan</Link>
       <Collapse isOpen={!collapsed} navbar>
         <Nav className="ml-auto" navbar>
           <NavItem>
             <Link
               to="/"
               className="menu-category"
             >all categories</Link>
           </NavItem>
           {categories && categories.rows && (categories.rows.map((category, key) => {
             return <NavItem key={key}>
               <Link
                 to={'/'+category.name}
                 id={category.name}
                 className="menu-category"
               >{category.name}</Link>
             </NavItem>
           }))}
         </Nav>
       </Collapse>
      </Navbar>
    )
  }
}

function mapStateToProps ({ collapsed, categories }) {
  return {
    collapsed, /* It feels silly to put this in the store, but the rubric says to do so! */
    categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setCollapsed: (collapsed) => dispatch(getCollapsed(collapsed)),/* It feels silly to put this in the store, but the rubric says to do so! */
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)
