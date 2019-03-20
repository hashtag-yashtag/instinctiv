import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { PasswordForgetForm } from '../PasswordForget';

import * as ROUTES from '../../constants/routes';
import { Button } from 'reactstrap';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  photoURL: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

  }

  onSubmit = event => {
    const { username, email, passwordOne, photoURL } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase.db.collection("Users").doc(authUser.user.uid)
        //.user(authUser.user.uid)
        .set({
          username: username,
          email: email,
          photoURL: photoURL,
          balance: 500,
          correctBets: 0,
          totalBets: 0,
          accuracy: 0.5
        }).then(() => {
          this.setState({ ...INITIAL_STATE });
          this.props.history.push(ROUTES.HOME);
        })
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      photoURL,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      photoURL === '';

    return (
      <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <input
          name="photoURL"
          value={photoURL}
          onChange={this.onChange}
          type="text"
          placeholder="Enter photo URL"
        />

      <Button color ="primary" disabled={isInvalid} type="submit">Sign Up</Button>

        {error && <p>{error.message}</p>}
      </form>
    </div>
  </div>
    );
  }
}

const SignUpLink = () => (
  <div className="row">
      <div className="column small-centered small-11 medium-6 large-5">
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
</div>
</div>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
