import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import '../css/App.css'
import * as ReadableAPI from '../utils/ReadableAPI'
import { getCategories } from '../actions'
import Menu from '../components/Menu'
import Root from '../components/Root'
import CategoryView from '../components/CategoryView'

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
          <Route exact path='/:category' component={CategoryView} />
        </div>
      </BrowserRouter>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setCategories: (categories) => dispatch(getCategories(categories))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)
