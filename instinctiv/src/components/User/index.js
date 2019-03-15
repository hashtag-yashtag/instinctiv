import React, { Component } from "react";
import { AuthUserContext, withAuthorization } from '../Session';


class User extends Component {

    constructor(props){
        super(props);
        this.state = {
          authUser: null,
          balance: 0,
          email: '',
          accuracy: 0,
        }
      }
    
      componentDidMount() {
        this.props.firebase.db.collection("Users").doc(this.userId).onSnapshot(docSnapshot => {
          //console.log(`Received doc snapshot: docSnapshot`, docSnapshot.data());
          this.setState({
            balance: docSnapshot.data().balance,
            username: docSnapshot.data().username,
            authUser: docSnapshot.data(),
            email: docSnapshot.data(). email,
            accuracy:docSnapshot.data().accuracy,
          });      // ...
        }, err => {
          console.log(`Encountered error: ${err}`);
        });
      }
    
      render() {
        return (
          <AuthUserContext.Consumer>
          {authUser => (
              <div>
                <h2>Account: {this.state.email}</h2>
                <h3>Balance: {this.state.balance}</h3>
                <h3>Accuracy: {this.state.accuracy}</h3>
                <img  src={authUser.photoURL} />
                <PasswordChangeForm />
              </div>
            )}
          </AuthUserContext.Consumer>
        );
      }

}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(User);
