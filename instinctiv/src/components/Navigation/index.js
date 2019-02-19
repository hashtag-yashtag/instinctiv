import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <div>
<<<<<<< HEAD
    <div div className="top-bar-right">
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
=======
    <ul>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
>>>>>>> ed0cbf742fc25253e6523f276583eecb5308c445
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
<<<<<<< HEAD
    </div>
  </div>
);

export default Navigation;
=======
  </div>
);

export default Navigation;
>>>>>>> ed0cbf742fc25253e6523f276583eecb5308c445
