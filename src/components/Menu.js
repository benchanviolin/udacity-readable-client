import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import '../css/Menu.css'

const Menu = (props) => {
  const { category, collapsed, parent } = props;
  return (
    <Navbar color="dark" light className="menu-navbar" toggleable>
     <NavbarToggler right onClick={() => {parent.toggleNavbar && (parent.toggleNavbar())}} />
     <Link
       to="/"
       className="menu-home"
     >Readable by Ben Chan</Link>
     <Collapse isOpen={!collapsed} navbar>
       <Nav className="ml-auto" navbar>
         {category && category.rows && (category.rows.map((category, key) => {
           return <NavItem key={key}>
             <Link
               to={'/'+category.name}
               className="menu-category"
             >{category.name}</Link>
           </NavItem>
         }))}
       </Nav>
     </Collapse>
    </Navbar>
  )
}

export default Menu
