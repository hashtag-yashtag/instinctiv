import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

import { Button, Form, Input, Col, Row } from "reactstrap";

const PasswordForget = () => (
  <div>
    <h1>Password Forget</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: null
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
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
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <div>
        <Row>
     <Col sm="3"></Col>
      <Col sm="5">
          <Form onSubmit={this.onSubmit}>
            <p><strong>Forgot Password?</strong></p>
            <Input
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
            <Button color="primary" disabled={isInvalid} type="submit">
              Reset My Password
            </Button>

            {error && <p>{error.message}</p>}
          </Form>
        </Col>
      <Col sm="4"></Col>
      </Row>
      </div>
    );
  }
}

const PasswordForgetLink = () => (
  <div>
    <Row>
 <Col sm="3"></Col>
  <Col sm="5">
  <p>
    Forgot Password? <Link to={ROUTES.PASSWORD_FORGET}>Reset Password</Link>
  </p>
</Col>
<Col sm="4"></Col>
</Row>

</div>
);

export default PasswordForget;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
