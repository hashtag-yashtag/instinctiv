import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
//import { PasswordForgetForm } from '../PasswordForget';

import * as ROUTES from '../../constants/routes';
import {Button, Form, Input, Col, Row} from 'reactstrap';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
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
          photoURL: photoURL || 'https://goo.gl/Fz9nrQ',
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
      <div>
        <Row>
     <Col sm="3"></Col>
      <Col sm="5">
      <Form onSubmit={this.onSubmit}>
        <Input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
      <Input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
      <Input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
      <Input
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

      </Form>
      </Col>
    <Col sm="4"></Col>
    </Row>
  </div>
    );
  }
}

const SignUpLink = () => (
  <div>
    <Row>
 <Col sm="3"></Col>
  <Col sm="5">
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
</Col>
<Col sm="4"></Col>
</Row>

</div>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
