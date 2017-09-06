import React, { Component } from 'react'
import { connect } from 'react-redux'
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
    console.log('Props', this.props);
    const { category } = this.props;

    return (
      <div className='container'>

        <div className='nav'>
          <h1 className='header'>Readable by Ben Chan</h1>
          {category && category.rows && (category.rows.map((category, key) => {
            return <button
              key={key}
            >{category.name}</button>
          }))}
        </div>

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
