import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import '../css/App.css'
import * as ReadableAPI from '../utils/ReadableAPI'
import { getCategories, getPosts } from '../actions'
import Menu from '../components/Menu'
import Root from '../components/Root'
import CategoryView from '../components/CategoryView'
import PostView from '../components/PostView'

class App extends Component {
  componentDidMount() {
    ReadableAPI.getCategories().then((categories) => {
      this.props.setCategories(categories);

      ReadableAPI.getPosts().then((categories) => {
        this.props.setPosts(categories);
      })
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Menu />
          <Route exact path="/" component={Root} />
          <Route exact path="/:category" component={CategoryView} />
          <Route exact path="/:category/:postId" component={PostView} />
        </div>
      </BrowserRouter>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setCategories: (categories) => dispatch(getCategories(categories)),
    setPosts: (posts) => dispatch(getPosts(posts))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)
