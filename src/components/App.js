import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import '../css/App.css'
import * as ReadableAPI from '../utils/ReadableAPI'
import { getCategories } from '../actions'
import Menu from '../components/Menu'
import Root from '../components/Root'
import Category from '../components/Category'

class App extends Component {
  componentDidMount() {
    ReadableAPI.getCategories().then((categories) => {
      this.props.setCategories(categories);
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Menu />
          <Route exact path='/' component={Root} />
          <Route exact path='/:category' component={Category} />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps ({ collapsed, category }) {
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
