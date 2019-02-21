import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';


import { withFirebase } from '../Firebase';
import {Button} from 'reactstrap';

class SignInGoogleBase extends Component {
    constructor(props) {
      super(props);

      this.state = { error: null };
    }

    onSubmit = event => {
      this.props.firebase
        .doSignInWithGoogle()
        .then(socialAuthUser => {
            // Create a user in your Firebase Realtime Database too
            return this.props.firebase.db.collection("Users").doc(socialAuthUser.user.uid)
              .set({
                username: socialAuthUser.user.displayName,
                email: socialAuthUser.user.email,
                //roles: [],
              });
          })
        .then(socialAuthUser => {
          this.setState({ error: null });
          this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
          this.setState({ error });
        });

      event.preventDefault();
    };

    render() {
      const { error } = this.state;

      return (
        <div className="row">
            <div className="column small-centered small-11 medium-6 large-5">
        <form onSubmit={this.onSubmit}>
          <Button color="success" type="submit">Sign In with Google</Button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    </div>
      );
    }
  }


export default SignInGoogleBase;
