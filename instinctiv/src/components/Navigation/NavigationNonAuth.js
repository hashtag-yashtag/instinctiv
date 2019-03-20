import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

/* export default withAuthentication(AppS);
 */

const NavigationNonAuth = () => (
  <div>
    <div div className="top-bar-right">
    <ul className="vertical medium-horizontal menu">
      <li>
        <Link to={ROUTES.SIGN_IN} className="menu-text1" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.LANDING} className="menu-text1" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Landing</Link>
      </li>
    </ul>
    </div>
  </div>
);

export default NavigationNonAuth;
