import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import {toggleDarkLight} from '../Home'

import { Button } from 'reactstrap';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  toggleDarkLight = event => {
   var body = document.getElementById("body");
   var currentClass = body.className;
   body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
 }


  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <body id="body" class="light-mode">
      <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
          <Button color="primary" name="dark_light" onClick= {this.toggleDarkLight} title="Toggle dark/light mode">Change Theme</Button>
      <form onSubmit={this.onSubmit}>
        <label>Enter Password</label>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <label>Confirm password</label>
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
      <Button color = "primary" disabled={isInvalid} type="submit">
          Change My Password
        </Button>


        {error && <p>{error.message}</p>}
      </form>
    </div>
  </div>
  </body>
    );
  }
}

export default withFirebase(PasswordChangeForm);
