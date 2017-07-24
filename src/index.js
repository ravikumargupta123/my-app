import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import registerServiceWorker from './registerServiceWorker';

import Login from './components/login';
import Search from './components/search';
import Logout from './components/logout';

var someAuthCheck = function(nextState, transition) {
  if (!sessionStorage.user) window.location.href = '/login';
};
var logout = function(nextState, transition) {
  window.sessionStorage.clear();
  window.location.replace('/login');
};

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login} />
      <Route path="login" component={Login} />
      <Route path="search" onEnter={someAuthCheck} component={Search} />
      <Route path="logout" onEnter={logout} component={Logout} />
    </Route>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
