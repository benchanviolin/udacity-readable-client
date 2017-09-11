import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addPost } from '../actions'
import { Card, CardBlock, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'
import '../css/Post.css';
import * as ReadableAPI from '../utils/ReadableAPI'
import serializeForm from 'form-serialize'
import { default as UUID } from 'node-uuid'

class PostAdd extends Component {
  static propTypes = {
    category: PropTypes.string
  }
  addPost = e => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    const id = UUID.v4();
    const timestamp = Date.now();
    ReadableAPI.addPost(id, timestamp, values.postTitle, values.postBody, values.postAuthor, values.postCategory).then(post => {
      this.props.addPost(post);
      this.props.history.goBack();
    })
    /*if (this.props.onCreateContact)
      this.props.onCreateContact(values)*/
  }
  render() {
    const { history, categories, category } = this.props;
    console.log('Props', this.props);

    return (
      <form onSubmit={this.addPost}>
        <Card>
          <CardBlock>
            <CardTitle>
              <label htmlFor="postTitle">Title:</label>
              <input id="postTitle" name="postTitle" className="form-control" placeholder="Enter a title."></input>
            </CardTitle>
            <br></br>
            <CardSubtitle>
              <label htmlFor="postAuthor">Author:</label>
              <input id="postAuthor" name="postAuthor" className="form-control" placeholder="Enter an author."></input>
              <br></br>
              <label htmlFor="postCategory">Category:</label>
              <select id="postCategory" name="postCategory" className="form-control" defaultValue={category}>
                {categories && categories.rows && (categories.rows.map((category, key) => (
                  <option key={key} value={category.name}>{category.name}</option>
                )))}
              </select>
            </CardSubtitle>
            <br></br>
            <CardText>
              <label htmlFor="postBody">Body:</label>
              <textarea id="postBody" name="postBody" className="form-control" placeholder="Enter a body." rows={5}></textarea>
            </CardText>
            <div className="post-buttons-right">
              <Button
                type="submit"
                className="post-button"
              >Add</Button>
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

function mapStateToProps ({ posts, categories }) {
  return {
    posts,
    categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (post) => dispatch(addPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostAdd)
