import React, { Component } from 'react';
import Search from './search';
import { Panel, Col, ControlLabel } from 'react-bootstrap';

class App extends Component {
  constructor() {
    super();
    this.state = { planet: [] };
  }
  fetchData(url) {
    return fetch(url).then(function(response) {
      return response.json();
    });
  }
  componentWillMount() {
    this.fetchData('http://swapi.co/api/planets/?page=1')
      .then(
        function(json) {
          console.log('parsed json', json);
          this.setState(
            {
              planet: json.results,
              next: json.next,
              previous: json.previous
            },
            () => {
              if (this.state.next) {
                this.handleNext();
              }
            }
          );
        }.bind(this)
      )
      .catch(function(ex) {
        console.log('parsing failed', ex);
      });
  }
  componentDidMount() {}
  handleNext() {
    this.fetchData(this.state.next)
      .then(
        function(json) {
          var data = this.state.planet.concat(json.results);
          this.setState(
            {
              planet: data,
              next: json.next,
              previous: json.previous
            },
            () => {
              if (this.state.next) this.handleNext();
            }
          );
        }.bind(this)
      )
      .catch(function(ex) {
        console.log('parsing failed', ex);
      });
  }
  next() {
    if (this.state.next) {
      return <div onClick={() => this.handleNext()}>next</div>;
    }
  }
  doSearch(search) {
    console.log('srach', search);
    var result = [];
    if (search === '') {
      result = [];
    } else {
      this.state.planet.forEach((val, i) => {
        if (val.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          result.push(val);
        }
      });
    }
    this.setState({ result: result });
  }
  render() {
    var planet = this.state.planet.map(val => {
      return (
        <li
          key={val.name}
        >{`Name= ${val.name}, Population= ${val.population}`}</li>
      );
    });
    const title = <h3>Planets Name And Population</h3>;
    return (
      <div>
        <Search doSearch={s => this.doSearch(s)} result={this.state.result} />
        <div>
          <Col componentClass={ControlLabel} sm={12}>
            <Panel header={title} bsStyle="primary">
              <ul>
                {planet}
              </ul>
            </Panel>
          </Col>
        </div>
        <div>
          {' '}{this.next()}{' '}
        </div>
      </div>
    );
  }
}

export default App;
