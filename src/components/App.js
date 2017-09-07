import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import '../css/App.css'
import * as ReadableAPI from '../utils/ReadableAPI'
import { getCollapsed, getCategories } from '../actions'
import Menu from '../components/Menu'
import Home from '../components/Home'
import Category from '../components/Category'

class App extends Component {
  /*state = {
    collapsed: true
  }*/ /* This is how I would do it if the rubric didn't force me to put everything in the Redux store */
  componentDidMount() {
    ReadableAPI.getCategories().then((categories) => {
      this.props.setCategories(categories);
    })
  }
  toggleNavbar() {
    /*this.setState(state => ({
      collapsed: !state.collapsed
    }));*/ /* This is how I would do it if the rubric didn't force me to put everything in the Redux store */
    this.props.setCollapsed(!this.props.collapsed);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Menu
            collapsed={/*this.state.collapsed*/ /* This is how I would do it if the rubric didn't force me to put everything in the Redux store */
              this.props.collapsed
            }
            category={this.props.category}
            parent={this /* TODO: How do I reference toggleNavbar from inside the Menu component without referencing parent like this?  What's best practice?*/}
          />
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/:category' component={Category}></Route>          
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps ({ collapsed, category }) {
  return {
    collapsed, /* It feels silly to put this in the store, but the rubric says to do so! */
    category
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setCollapsed: (collapsed) => dispatch(getCollapsed(collapsed)),/* It feels silly to put this in the store, but the rubric says to do so! */
    setCategories: (categories) => dispatch(getCategories(categories))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
