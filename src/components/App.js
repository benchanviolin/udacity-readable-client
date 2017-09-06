import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '../logo.svg'
import '../css/App.css'
import * as ReadableAPI from '../utils/ReadableAPI'
import { getCategories } from '../actions'

class App extends Component {
  componentDidMount() {
    ReadableAPI.getCategories().then((categories) => {
      this.props.setCategories(categories);
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

function mapStateToProps ({ categories }) {
  return {
    categories
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
