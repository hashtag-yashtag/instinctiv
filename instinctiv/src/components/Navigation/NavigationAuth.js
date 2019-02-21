import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';


/* export default withAuthentication(AppS);
 */

const NavigationAuth = () => (
  <div>
    <div div className="top-bar-right">
    
    <ul className="vertical medium-horizontal menu">
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
        <Link to={ROUTES.NOTIFICATIONS} className="menu-text1" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Notifications</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
    </div>
  </div>
);

export default NavigationAuth;
