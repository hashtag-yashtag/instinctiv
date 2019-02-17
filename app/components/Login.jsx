import React from 'react';

var Login = React.createClass({
  render: function(){
    return (
      <div>
        <h3 className="page-title"><strong>Log In</strong></h3>
          <div className="row">
           <div className="column small-centered small-11 medium-6 large-5">
      <form>
          <input type="text" placeholder="Email"/>

          <input type="text" placeholder="Password"/>
      <button className="button expanded">Log In</button>
</form>
</div>
</div>
</div>

    );
  }
});
module.exports = Login;
