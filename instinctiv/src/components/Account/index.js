import {toggleDarkLight} from '../Home'
import React from 'react';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';
import {Button} from 'reactstrap';



const Account = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
        <h1>Account: {authUser.email}</h1>
        <PasswordChangeForm />
      </div>
    </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);
