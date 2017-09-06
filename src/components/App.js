import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/App.css'
import * as ReadableAPI from '../utils/ReadableAPI'
import { getCategories } from '../actions'
import { Button } from 'reactstrap'; //http://reactstrap.github.io/

class App extends Component {
  componentDidMount() {
    ReadableAPI.getCategories().then((categories) => {
      this.props.setCategories(categories);
    })
  }
  render() {
    console.log('Props', this.props);
    const { category } = this.props;

    return (
      <div className="nav">
        <div className="nav-header"></div>
        <label className="nav-label">Choose a category:</label>
        {category && category.rows && (category.rows.map((category, key) => {
          return <Button
            key={key}
            className="nav-button"
            color="primary"
            size="large"
          >{category.name}</Button>
        }))}
      </div>
    );
  }
}

function mapStateToProps ({ category }) {
  return {
    category
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
