import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';

const Admin = () => (
  <div className="row">
    Hi Admin!
</div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Admin);
