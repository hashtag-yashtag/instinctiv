import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';

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
            .onSnapshot(docSnapshot => {
              if(docSnapshot.exists){
                console.log('exists');
                
              }else{
                this.props.firebase.db.collection("Users").doc(socialAuthUser.user.uid)
                .set({
                  username: socialAuthUser.user.displayName,
                  email: socialAuthUser.user.email,
                  balance: 500,
                  correctBets: 0,
                  totalBets: 0,
                  accuracy: 0.5
                  //roles: [],
                }, {merge: true});
              }
              this.setState({
                balance: docSnapshot.data().balance,
                username: docSnapshot.data().username,
                correctBets: docSnapshot.data().correctBets,
                totalBets: docSnapshot.data().totalBets,
                accuracy: docSnapshot.data().accuracy
              });      // ...
              this.setState({ error: null });
              this.props.history.push(ROUTES.HOME);
              // ...
            }, error => {
              this.setState({ error });
            });
  
      });
      event.preventDefault();
  }
  
    render() {
      const { error } = this.state;
  
      return (
        <form onSubmit={this.onSubmit}>
          <Button color = "primary" type="submit">Sign In with Google</Button>

  
          {error && <p>{error.message}</p>}
        </form>
      );
    }
  }


export default SignInGoogleBase;
