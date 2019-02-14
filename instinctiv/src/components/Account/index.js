import React from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import { PasswordChangeForm } from '../PasswordChange';


const Account = () => (
  <div>
    Account
    <PasswordForgetForm/>
    <PasswordChangeForm/>
  </div>
);

export default Account;