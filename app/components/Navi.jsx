var React = require('react');
var {Link, IndexLink} = require('react-router');

var Navi = React.createClass({
  render: function () {
  return(
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">Instinctiv</li>
        </ul>
         </div>
      <div className="top-bar-right">
       <ul className="vertical medium-horizontal menu">
         <li>
           <IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Dashboard</IndexLink>
         </li>
       </ul>
       </div>
    </div>

 );
}
});
module.exports = Navi;
