import React, { Component } from 'react';
import { Row, Col, ControlLabel } from 'react-bootstrap';

class Search extends Component {
  constructor() {
    super();
    this.state = { search: '' };
  }
  doSearch(e) {
    this.props.doSearch(e.target.value);
  }
  render() {
    if (this.props.result && this.props.result.length > 0) {
      console.log(this.props.result);
      var sortdata = this.props.result.sort(
        (a, b) => b.population - a.population
      );
      var list = sortdata
        .map((val, i) => {
          return (
            <li key={val.name} style={{ fontSize: 120 - i + '%' }}>
              {`Name= ${val.name}, Population= ${val.population}`}
            </li>
          );
        })
        .filter((val, index) => {
          console.log('index', index);
          var data = JSON.parse(sessionStorage.user);
          if (data.name === 'Luke Skywalker') {
            return index < 15;
          } else {
            return index < 5;
          }
        });
      var searchItem = (
        <Row>
          <Col componentClass={ControlLabel} smOffset={4} sm={12}>
            <div className="dropdown-content">
              <ul>
                {list}
              </ul>
            </div>
          </Col>
        </Row>
      );
    } else {
      searchItem = '';
    }
    return (
      <div>
        <Row>
          <Col componentClass={ControlLabel} smOffset={4} xsOffset={1} sm={12}>
            Search :{' '}
            <input
              type="search"
              ref="searchInput"
              placeholder="Search Planet Name"
              onChange={e => this.doSearch(e)}
            />
          </Col>
        </Row>
        {searchItem}
      </div>
    );
  }
}

export default Search;
