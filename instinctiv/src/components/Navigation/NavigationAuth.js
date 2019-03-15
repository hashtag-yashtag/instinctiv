import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

/* export default withAuthentication(AppS);
 */

const NavigationAuth = () => (
  <div>
    <div div className="top-bar-right">
      <ul className="vertical medium-horizontal menu">
        <li>
          <Link
            to={ROUTES.HOME}
            className="menu-text1"
            activeClassName="active"
            activeStyle={{ fontWeight: "bold" }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to={ROUTES.ACCOUNT}
            className="menu-text1"
            activeClassName="active"
            activeStyle={{ fontWeight: "bold" }}
          >
            Account
          </Link>
        </li>
        <li>
          <Link
            to={ROUTES.ADMIN}
            className="menu-text1"
            activeClassName="active"
            activeStyle={{ fontWeight: "bold" }}
          >
            Admin
          </Link>
        </li>
        {/* <li>
          <Link
            to={ROUTES.STOCKS}
            className="menu-text1"
            activeClassName="active"
            activeStyle={{ fontWeight: "bold" }}
          >
            Stocks
          </Link>
        </li> */}
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Notifications
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>No Notifications</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </div>
  </div>
);

export default NavigationAuth;
