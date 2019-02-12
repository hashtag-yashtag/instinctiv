var React = require('react');
var Navi = require('Navi');

var Main = (props) => {
  return (
    <div className="start_page">
      <Navi/>
      <div className="row">
        <div className="columns medium-6 large-4 small-centered">
          {props.children}
        </div>
      </div>
    </div>
  );
}
module.exports = Main;
