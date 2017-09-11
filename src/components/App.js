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
import PostViewEdit from '../components/PostViewEdit'
import PostViewAdd from '../components/PostViewAdd'
import CommentViewEdit from '../components/CommentViewEdit'
import Filter from '../components/Filter'

class App extends Component {
  componentDidMount() {
    ReadableAPI.getCategories().then((categories) => { this.props.setCategories(categories); });
    ReadableAPI.getPosts().then((categories) => { this.props.setPosts(categories); });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Menu />
          {!this.props.postViewVisible && !this.props.commentViewVisible && (
            <Filter />
          )}
          <Route exact path="/" component={Root} />
          {this.props.categories && this.props.categories.rows && (
            this.props.categories.rows.map((category, key) => (
              <Route key={key} exact path={'/' + category.path} component={CategoryView} />
            ))
          )}
          <Route exact path="/:category/:postId" component={PostView} />
          <Route exact path="/:category/:postId/edit" component={PostViewEdit} />
          <Route exact path="/addpost" component={PostViewAdd} />
          <Route exact path="/:category/addpost" component={PostViewAdd} />
          <Route exact path="/:category/:postId/comment/:commentId/edit" component={CommentViewEdit} />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps ({ categories, postViewVisible, commentViewVisible }) {
  return {
    categories,
    postViewVisible,
    commentViewVisible
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setCategories: (categories) => dispatch(getCategories(categories)),
    setPosts: (posts) => dispatch(getPosts(posts))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
