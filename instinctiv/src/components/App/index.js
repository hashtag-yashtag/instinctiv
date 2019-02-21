import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import { AuthUserContext } from '../Session';
<<<<<<< HEAD
import Notifications from '../Notifications';
=======
>>>>>>> db44897d6774e5080d10531d35885ca0679076da

import { withAuthentication } from '../Session';


import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'foundation-sites/dist/foundation.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';




const App = () => (
    <Router>
<<<<<<< HEAD
      <div>
        <Navigation />
=======
      <div> 
        <Navigation />

        <hr />

>>>>>>> db44897d6774e5080d10531d35885ca0679076da
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
<<<<<<< HEAD
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.NOTIFICATIONS} component={Notifications} />
=======
        <Route path={ROUTES.ADMIN} component={AdminPage} /> 
>>>>>>> db44897d6774e5080d10531d35885ca0679076da
      </div>
    </Router>
);

export default withAuthentication(App);
<<<<<<< HEAD
=======

>>>>>>> db44897d6774e5080d10531d35885ca0679076da
