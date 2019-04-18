import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut";
import Notifications from "../Notifications";
import {
  AuthUserContext,
  withAuthorization,
  withAuthentication
} from "../Session";

import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import { Navbar } from "react-bootstrap";
import Autocomplete from "./Autocomplete";
import "react-autocomplete-input/dist/bundle.css";
import {
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
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

var stockSearchList = [];
var userSearchList = [];

class NavigationAuth extends Component {
  constructor(props) {
    super(
      props
    ); /*
    this.setState({
      stockSearchLis: [],
      userSearchList: [],
    }) */
  }

  async componentDidMount() {
    /*
    this.setState({
      stockSearchLis: [],
      userSearchList: [],
    }) */
    stockSearchList = [];
    userSearchList = [];

    await this.props.firebase.db
      .collection("Stocks")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          stockSearchList.push(
            doc.data()["ticker"] + ": " + doc.data()["name"]
          );
        });
      });

    await this.props.firebase.db
      .collection("Users")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          userSearchList.push(doc.data()["username"]);
        });
      });
  }

  render() {
    return (
      /*
      <AuthUserContext.Consumer>
      {authUser => ( */
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="vertical medium-horizontal menu">
            <li>
              <Navbar.Brand href={ROUTES.HOME}>Instinctiv</Navbar.Brand>
            </li>
            <li>
              <Autocomplete
                suggestions={stockSearchList}
                userSuggestions={userSearchList}
              />
            </li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="vertical medium-horizontal menu">
            <li>
              <Link
                to={ROUTES.HOME}
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

            {!!this.props.authUser.roles[ROLES.ADMIN] && (
              <li>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Admin
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <li>
                        <Link
                          to={ROUTES.USERDATA}
                          className="menu-text1"
                          activeclassname="active"
                          activestyle={{ fontWeight: "bold" }}
                        >
                          Users
                        </Link>
                      </li>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <li>
                        <Link
                          to={ROUTES.STOCKDATA}
                          className="menu-text1"
                          activeclassname="active"
                          activestyle={{ fontWeight: "bold" }}
                        >
                          Stocks
                        </Link>
                      </li>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <li>
                        <Link
                          to={ROUTES.PREDICTION}
                          className="menu-text1"
                          activeclassname="active"
                          activestyle={{ fontWeight: "bold" }}
                        >
                          Prediction
                        </Link>
                      </li>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </li>
            )}
            <li>
              <Link
                to={ROUTES.LANDING}
                className="menu-text1"
                activeclassname="active"
                activestyle={{ fontWeight: "bold" }}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.HOME}
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
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Admin
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    {!!this.props.authUser.roles[ROLES.ADMIN] && (
                      <li>
                        <Link
                          to={ROUTES.USERDATA}
                          className="menu-text1"
                          activeclassname="active"
                          activestyle={{ fontWeight: "bold" }}
                        >
                          Users
                        </Link>
                      </li>
                    )}
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    {!!this.props.authUser.roles[ROLES.ADMIN] && (
                      <li>
                        <Link
                          to={ROUTES.STOCKDATA}
                          className="menu-text1"
                          activeclassname="active"
                          activestyle={{ fontWeight: "bold" }}
                        >
                          Stocks
                        </Link>
                      </li>
                    )}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </li>
            <li>
              <Link
                to={ROUTES.CHECKOUT}
                className="menu-text1"
                activeclassname="active"
                activestyle={{ fontWeight: "bold" }}
              >
                Buy Tokens
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.HELP}
                className="menu-text1"
                activeclassname="active"
                activestyle={{ fontWeight: "bold" }}
              >
                FAQs
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
  }
}
/*
const condition = authUser => !!authUser;

 */
export default withAuthentication(NavigationAuth);
/* )}
      </AuthUserContext.Consumer>
     */
