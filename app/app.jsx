var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
import Main from 'Main';
import Dashboard from 'Dashboard';

import Login from 'Login';

require('style!css!foundation-sites/dist/foundation.min.css');
require('style!css!bootstrap/dist/css/bootstrap.min.css');
require('style!css!applicationStyles');

$(document).foundation();

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/login" component={Login}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
