import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Row,
  Col,
  ControlLabel,
  Button,
  FormControl
} from 'react-bootstrap';

class Login extends Component {
  constructor() {
    super();
    this.state = { username: '', password: '', error: {}, disable: false };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value, error: {} });
  }
  fetchData() {
    return fetch(`http://swapi.co/api/people/`).then(function(response) {
      return response.json();
    });
  }
  validateData() {
    var error = {};
    if (this.state.username === '') {
      error.username = 'username is required';
    }
    if (this.state.password === '') {
      error.password = 'password is required';
    }
    return error;
  }
  handleSubmit(event) {
    event.preventDefault();
    var error = this.validateData();
    if (Object.keys(error).length !== 0) {
      this.setState({ error: error });
      return;
    }
    var self = this;
    this.setState({ disable: true });
    this.fetchData()
      .then(function(json) {
        var data = json.results;
        for (let val of data) {
          if (
            val.name === self.state.username &&
            val.birth_year === self.state.password
          ) {
            sessionStorage.user = JSON.stringify(val);
            window.location.href = '/search';
            break;
          }
        }
        setTimeout(() => {
          error.notFound = 'Username or Password is incorrect';
          self.setState({ error: error, disable: false });
        }, 1000);
      })
      .catch(function(ex) {
        console.log('parsing failed', ex);
      });
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <Row className="error show-grid">
          <Col componentClass={ControlLabel} smOffset={2} sm={12}>
            {this.state.error.notFound}
          </Col>
        </Row>
        <br />
        <Form
          horizontal
          onSubmit={e => this.handleSubmit(e)}
          autoComplete="off"
        >
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Username
            </Col>
            <Col sm={4}>
              <FormControl
                type="text"
                name="username"
                value={this.state.username}
                onChange={e => this.handleChange(e)}
              />
            </Col>
            <span className="error">
              {this.state.error.username}
            </span>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={4}>
              <FormControl
                type="password"
                name="password"
                value={this.state.password}
                onChange={e => this.handleChange(e)}
              />
            </Col>
            <span className="error">
              {this.state.error.password}
            </span>
          </FormGroup>
          <Col smOffset={2} sm={13}>
            <Button type="submit" disabled={this.state.disable}>
              Sign in
            </Button>
          </Col>
        </Form>
      </div>
    );
  }
}

export default Login;
