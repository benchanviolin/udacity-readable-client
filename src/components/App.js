import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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
import CommentViewAdd from '../components/CommentViewAdd'
import Filter from '../components/Filter'
import Page404 from '../components/Page404'

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
          {!this.props.postViewVisible && !this.props.commentViewVisible && !this.props.page404Visible && (
            <Filter />
          )}
          <Switch>
            <Route exact path="/" component={Root} />
            {this.props.categories && this.props.categories.rows && (
              this.props.categories.rows.map((category, key) => (
                <Route key={key} exact path={'/' + category.path} component={CategoryView} />
              ))
            )}
            <Route exact path="/addpost" component={PostViewAdd} />
            <Route exact path="/:category/addpost" component={PostViewAdd} />
            <Route path="/:category/:postId">
              <div>
                <Route exact path="/:category/:postId" component={PostView} />
                <Route exact path="/:category/:postId/edit" component={PostViewEdit} />
                <Route exact path="/:category/:postId/comment/:commentId/edit" component={CommentViewEdit} />
                <Route exact path="/:category/:postId/addcomment" component={CommentViewAdd} />
              </div>
            </Route>
            <Route component={Page404}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps ({ categories, postViewVisible, commentViewVisible, page404Visible }) {
  return {
    categories,
    postViewVisible,
    commentViewVisible,
    page404Visible
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
