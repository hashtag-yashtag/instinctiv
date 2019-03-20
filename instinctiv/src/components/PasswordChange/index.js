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
<<<<<<< HEAD
      <body id="body" class="light-mode">
      <div className="row">
<<<<<<< HEAD
          <div className="column small-centered small-11 medium-6 large-5">
          <Button color="primary" name="dark_light" onClick= {this.toggleDarkLight} title="Toggle dark/light mode">Change Theme</Button>
=======
          <div className="column small-7 medium-4 large-3">
>>>>>>> bf936d23a353427159960f6eb17d5a190f150177
      <form onSubmit={this.onSubmit}>
=======
      <div>
      <Form onSubmit={this.onSubmit}>
>>>>>>> 73e05bc2ded05f0f67e50f49386f7f2e5e7a9ae9
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
  </body>
    );
  }
}

export default withFirebase(PasswordChangeForm);
