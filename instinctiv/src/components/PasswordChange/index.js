import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

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
      <div className="row">
          <div className="column small-7 medium-4 large-3">
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
    );
  }
}

export default withFirebase(PasswordChangeForm);
