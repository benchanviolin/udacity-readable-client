import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPage404Visible } from '../actions'
import '../css/Page404.css'

class Page404 extends Component {
  componentDidMount() {
    this.props.setPage404Visible(true);
  }
  render() {
    return (
      <div className="page404-wrapper">
        Page not found.  Click a menu item to return to the app.
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setPage404Visible: (visible) => dispatch(getPage404Visible(visible))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Page404)
