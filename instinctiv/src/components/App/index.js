import React, { Component } from 'react';
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

import { withAuthentication } from "../Session";

import AdminPage from "../Admin";

import * as ROUTES from "../../constants/routes";
import "bootstrap/dist/css/bootstrap.min.css";

import "foundation-sites/dist/css/foundation.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Title from './Title';
import { ThemeProvider } from 'styled-components';
import Sky from './Sky';
import CelestialObject from './CelestialObject';

const dayTheme = {
  skyColor: '#37d8e6',
  celestialObjectColor: '#ffdd00',
  celestialObjectBorderColor: '#f1c40f'
};

const nightTheme = {
  skyColor: '#2c3e50',
  celestialObjectColor: '#bdc3c7',
  celestialObjectBorderColor: '#eaeff2'
}

const Pages = () => (

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
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.NOTIFICATIONS} component={Notifications} />
      <Route path={ROUTES.STOCKS} component={Stocks} />
    </div>
  </Router>
);

class App extends React.Component{

  constructor(props) {
    super(props);


    // Initial state: day time!
    this.state = {
      isDay: true,
      theme: dayTheme

    };
  }

  handleClick() {
    // Toggle day / night on click
    const isDay = !this.state.isDay;

    this.setState({
      isDay: isDay,
      theme: isDay ? dayTheme : nightTheme

    });
  }

  render() {
    // Wrap the entire content in a <ThemeProvider>
    return <ThemeProvider theme={this.state.theme}>
        <Sky>
          <Title>{this.state.title}</Title>
          <CelestialObject
            onClick={() => this.handleClick()}>
          </CelestialObject>
        </Sky>
    </ThemeProvider>
  }
}


export default withAuthentication(App);
