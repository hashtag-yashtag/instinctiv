var React = require('react');
var {Link, IndexLink} = require('react-router');

var Navi = React.createClass({
  render: function () {
  return(
    <div>
      <div className="top-bar-left">
        <ul className="menu">
        <strong><li className="menu-text2">Instinctiv</li></strong>
        </ul>
         </div>
      <div className="top-bar-right">
       <ul className="vertical medium-horizontal menu">
         <li>
           <IndexLink to="/" className="menu-text1" activeClassName="active" activeStyle={{fontWeight: 'bold'}}></IndexLink>
         </li>
         <li>
           <IndexLink to="/dashboard" className="menu-text1" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Dashboard</IndexLink>
         </li>
       </ul>
       </div>
    </div>

 );
}
});
module.exports = Navi;
