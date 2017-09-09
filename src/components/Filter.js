import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap' //http://reactstrap.github.io/
import '../css/Filter.css'
import { changeFilter } from '../actions'

class Filter extends Component {
  onChangeFilter(e) {
    this.props.changeFilter(e.target.value);
  }
  render() {
    const { filters } = this.props;

    return <Container fluid={true}>
      <Row>
        <Col
          xs={{ size: 12 }}
          className="filter-body text-center"
        >
          Sort By:
          &nbsp;
          <select
            defaultValue={filters.activeFilter}
            onChange={(e) => { this.onChangeFilter(e) }}
          >
            {filters && filters.rows && (
              filters.rows.map((filter, key) => (
                <option
                  key={key}
                  value={filter.id}
                >{filter.title}</option>
              ))
            )}
          </select>
        </Col>
      </Row>
    </Container>
  }
}

function mapStateToProps ({ filters }) {
  return {
    filters
  }
}

function mapDispatchToProps (dispatch) {
  return {
    changeFilter: (activeFilter) => dispatch(changeFilter(activeFilter))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)
