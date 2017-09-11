import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addComment } from '../actions'
import { Card, CardBlock, CardSubtitle, CardText, Button } from 'reactstrap'
import '../css/Comment.css';
import * as ReadableAPI from '../utils/ReadableAPI'
import serializeForm from 'form-serialize'
import { default as UUID } from 'node-uuid'

class CommentAdd extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    parentId: PropTypes.string.isRequired
  }
  addComment = e => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    const id = UUID.v4();
    const timestamp = Date.now();
    ReadableAPI.addComment(id, timestamp, values.commentBody, values.commentAuthor, this.props.parentId).then(comment => {
      this.props.addComment(comment);
      this.props.history.goBack();
    })
    /*if (this.props.onCreateContact)
      this.props.onCreateContact(values)*/
  }
  render() {
    const { history } = this.props;
    console.log('Props', this.props);

    return (
      <form onSubmit={this.addComment}>
        <Card>
          <CardBlock>
            <CardSubtitle>
              <label htmlFor="commentAuthor">Author:</label>
              <input id="commentAuthor" name="commentAuthor" className="form-control" placeholder="Enter an author."></input>
            </CardSubtitle>
            <br></br>
            <CardText>
              <label htmlFor="commentBody">Body:</label>
              <textarea id="commentBody" name="commentBody" className="form-control" placeholder="Enter a body." rows={5}></textarea>
            </CardText>
            <div className="comment-buttons-right">
              <Button
                type="submit"
                className="comment-button"
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

function mapDispatchToProps (dispatch) {
  return {
    addComment: (comment) => dispatch(addComment(comment))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CommentAdd)
