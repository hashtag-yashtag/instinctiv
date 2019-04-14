import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import Notifications from "../Notifications";
import Stocks from "../Stocks";
import User from "../User";
import Help from "../Help";
import { withAuthentication } from "../Session";

import AdminPage from "../Admin";
import StockData from '../StockData';
import UserData from '../UserData';

import * as ROUTES from "../../constants/routes";
import "bootstrap-css-only/css/bootstrap.min.css";

import "foundation-sites/dist/css/foundation.min.css";
import Checkout from "../Checkout";

const App = () => (
  <Router>
    <div>
      <Navigation />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.HELP} component={Help} />
      <Route path={ROUTES.NOTIFICATIONS} component={Notifications} />
      <Route path={ROUTES.STOCKS} component={Stocks} />
      <Route path={ROUTES.STOCKDATA} component={StockData} />
      <Route path={ROUTES.USERDATA} component={UserData} />
      <Route path={ROUTES.USER} component={User}/>
      <Route path={ROUTES.CHECKOUT} component={Checkout}/>
    </div>
  </Router>
);

export default withAuthentication(App);
