import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import {toggleDarkLight} from '../Home'

import { Button, Form, Input } from 'reactstrap';

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
      <div>
      <body id="body" class="light-mode">
      <div className="row">
          <div>
          <Button color="primary" name="dark_light" onClick= {this.toggleDarkLight} title="Toggle dark/light mode">Change Theme</Button>
          <div className="column small-7 medium-4 large-3">
      <form onSubmit={this.onSubmit}>
      <div>
      <Form onSubmit={this.onSubmit}>
        <label>Enter Password</label>
        <Input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <label>Confirm password</label>
        <Input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
      <Button color = "primary" block disabled={isInvalid} type="submit">
          Change My Password
        </Button>


        {error && <p>{error.message}</p>}
      </Form>
        </div>
    </form>

  </div>
  </div>
  </div>
  </body>
  </div>

    );
  }
}

export default withFirebase(PasswordChangeForm);
