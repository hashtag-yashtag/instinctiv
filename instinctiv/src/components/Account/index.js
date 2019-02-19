import React from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';


const Account = () => (
  <div>
    <h1>Account</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
);

export default Account;