import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getComment } from '../actions'
import { Card, CardBlock, CardText, Button } from 'reactstrap';
import '../css/Comment.css';
import * as ReadableAPI from '../utils/ReadableAPI'
import serializeForm from 'form-serialize'
import * as SimpleFormValidator from '../utils/SimpleFormValidator'

class Comment extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
  }
  saveChanges = e => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    const timestamp = Date.now();

    if (SimpleFormValidator.validateText(values.commentBody, 'Please enter a body.', 'commentBody')        
      )
    {
      ReadableAPI.editComment(this.props.id, timestamp, values.commentBody).then(comment => {
        this.props.setComment(comment);
        this.props.history.goBack();
      })
    }
  }
  render() {
    const { history } = this.props;
    const { body } = this.props.data;

    return (
      <form onSubmit={this.saveChanges}>
        <Card>
          <CardBlock>
            {/* disabled based on server specs
            <CardSubtitle>
              <label htmlFor="commentAuthor">Author:</label>
              <input id="commentAuthor" name="commentAuthor" className="form-control" defaultValue={author} placeholder="Enter an author."></input>
            </CardSubtitle>
            <br></br>
            */}
            <CardText>
              <label htmlFor="commentBody">Body:</label>
              <textarea id="commentBody" name="commentBody" className="form-control" placeholder="Enter a body." rows={5} defaultValue={body}></textarea>
            </CardText>
            <div className="comment-buttons-right">
              <Button
                type="submit"
                className="comment-button"
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

function mapDispatchToProps (dispatch) {
  return {
    setComment: (comment) => dispatch(getComment(comment))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Comment)
