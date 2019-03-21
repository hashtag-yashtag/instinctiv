import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut";
import Notifications from "../Notifications";

import * as ROUTES from "../../constants/routes";
import {Navbar} from 'react-bootstrap';

/*
this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.O).onSnapshot(docSnapshot => {
  console.log(`Received doc snapshot: docSnapshot`, docSnapshot.data());
  balance = docSnapshot.data().balance;    // ...
}, err => {
  console.log(`Encountered error: ${err}`);
});
*/

/* export default withAuthentication(AppS);
 */

const NavigationAuth = () => (
  <div class = "top-bar">
    <Navbar.Brand href = {ROUTES.HOME}>Instinctiv</Navbar.Brand>
    <div className="top-bar-right">
      <ul className="vertical medium-horizontal menu">
        <li>
          <Link to={ROUTES.HOME}
            className="menu-text1"
            activeclassname="active"
            activestyle={{ fontWeight: "bold" }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to={ROUTES.ACCOUNT}
            className="menu-text1"
            activeclassname="active"
            activestyle={{ fontWeight: "bold" }}
          >
            Account
          </Link>
        </li>
        <li>
          <Link
            to={ROUTES.ADMIN}
            className="menu-text1"
            activeclassname="active"
            activestyle={{ fontWeight: "bold" }}
          >
            Admin
          </Link>
        </li>
          <Notifications />

        <li>
          <SignOutButton />
        </li>
      </ul>
    </div>
  </div>
);

export default NavigationAuth;
