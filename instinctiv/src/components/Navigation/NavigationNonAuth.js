import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {Navbar, Nav} from 'react-bootstrap';
/* export default withAuthentication(AppS);
 */

const NavigationNonAuth = () => (
  <div className="top-bar">
    <div className="top-bar-right">
    <ul className="vertical medium-horizontal menu">
      <li>
        <Link to={ROUTES.SIGN_IN} className="menu-text1" activeclassname="active" activestyle={{fontWeight: 'bold'}}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.LANDING} className="menu-text1" activeclassname="active" activestyle={{fontWeight: 'bold'}}>Landing</Link>
      </li>
    </ul>
    </div>
    </div>
);

export default NavigationNonAuth;
