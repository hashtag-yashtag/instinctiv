  import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';


/* export default withAuthentication(AppS);
 */

const Navigation = () => (
  <div className="top-bar">
    <div className="top-bar-right">
    <ul className="vertical medium-horizontal menu">
      <li>
        <Link to={ROUTES.SIGN_IN} className="menu-text1" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.LANDING} className="menu-text1" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME} className="menu-text1" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT} className="menu-text1" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Account</Link>
      </li>
      <li>
        <Link to={ROUTES.ADMIN} className="menu-text1" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Admin</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
    </div>
  </div>
);

export default Navigation;
