var React = require('react');
var {Link, IndexLink} = require('react-router');

var Navi = React.createClass({
  render: function () {
  return(
    <div>
      <div className="top-bar-left">
        <ul className="menu">
          <h1 className="menu-text">Instinctiv</h1>
        </ul>
         </div>
      <div className="top-bar-right">
       <ul className="vertical medium-horizontal menu">
         <li>
           <IndexLink to="/" className="menu-text" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Dashboard</IndexLink>
         </li>
       </ul>
       </div>
    </div>

 );
}
});
module.exports = Navi;
