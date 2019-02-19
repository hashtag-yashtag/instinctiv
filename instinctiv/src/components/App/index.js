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
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';

import 'foundation-sites/dist/foundation.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

=======
>>>>>>> ed0cbf742fc25253e6523f276583eecb5308c445

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
<<<<<<< HEAD
      <Route path={ROUTES.ADMIN} component={AdminPage} />
=======
      <Route path={ROUTES.ADMIN} component={AdminPage} /> 
>>>>>>> ed0cbf742fc25253e6523f276583eecb5308c445
    </div>
  </Router>
);

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> ed0cbf742fc25253e6523f276583eecb5308c445
