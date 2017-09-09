import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getCommentsByPostId, getPost } from '../actions'
import { Card, CardBlock, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import '../css/Post.css';
import * as ReadableAPI from '../utils/ReadableAPI'
import serializeForm from 'form-serialize'

class Post extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
  }
  saveChanges = e => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    ReadableAPI.editPost(this.props.id, values.postTitle, values.postBody).then(post => {
      this.props.setPost(post);
      this.props.history.goBack();
    })
    /*if (this.props.onCreateContact)
      this.props.onCreateContact(values)*/
  }
  render() {
    const { history, categories } = this.props;
    const { id, title, author, body, category } = this.props.data;
    console.log('Props', this.props);

    return (
      <form onSubmit={this.saveChanges}>
        <Card>
          <CardBlock>
            <CardTitle>
              <label htmlFor="postTitle">Title:</label>
              <input id="postTitle" name="postTitle" className="form-control" defaultValue={title} placeholder="Enter a title."></input>
            </CardTitle>
            <br></br>
            {/* disabled based on server specs
            <CardSubtitle>
              <label htmlFor="postAuthor">Author:</label>
              <input id="postAuthor" name="postAuthor" className="form-control" defaultValue={author} placeholder="Enter an author."></input>
              <br></br>
              <label htmlFor="postCategory">Category:</label>
              <select id="postCategory" name="postCategory" className="form-control" defaultValue={category}>
                {categories && categories.rows && (categories.rows.map((category, key) => (
                  <option key={key} value={category.name}>{category.name}</option>
                )))}
              </select>
            </CardSubtitle>
            <br></br>
            */}
            <CardText>
              <label htmlFor="postBody">Body:</label>
              <textarea id="postBody" name="postBody" className="form-control" placeholder="Enter a body." rows={5} defaultValue={body}></textarea>
            </CardText>
            <div className="post-buttons-right">
              <Button
                type="submit"
                className="post-button"
              >Save</Button>
              <Button
                onClick={(e) => { history.goBack(); }}
              >Cancel</Button>
            </div>
            <div className="clearfix"></div>
          </CardBlock>
        </Card>
      </form>
    )
  }
}

function mapStateToProps ({ posts, comments, categories }) {
  return {
    posts,
    comments,
    categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setCommentsByPostId: (postId, comments) => dispatch(getCommentsByPostId(postId, comments)),
    setPost: (post) => dispatch(getPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
