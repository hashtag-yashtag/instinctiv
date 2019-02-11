var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');



//Load foundation
$(document).foundation();
//CSS
require('style!css!sass!applicationStyles')
ReactDOM.render(
  <p>BoilerPlate3</p>,
  document.getElementById('app')
);
