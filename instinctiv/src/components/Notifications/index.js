import React, { Component } from 'react';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import { withAuthorization } from '../Session';



class Notifications extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    }
    
  }

  

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  renderNotifs(notif, id){

    var row = document.createElement('DropdownItem');
    row.setAttribute('id', id);
    var delBut = document.createElement('button');
    delBut.addEventListener('click',(e)=>{
      e.stopPropagation();
      console.log(e.target.parentElement.getAttribute('id'));
      this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.O)
      .collection("notifications").doc(e.target.parentElement.getAttribute('id')).update({
        active: false,
      });
      document.getElementById("menu").innerHTML = "";
    });
    delBut.textContent = 'X';
    //del.appendChild(delBut);
    row.appendChild(delBut);
    row.append(notif.data().message);

    document.getElementById("menu").appendChild(row);
  }
  
  componentDidMount() {
    this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.O)
            .collection("notifications")
              .where('active', '==', true)
              .onSnapshot(querySnapshot => {
      console.log(`Received query snapshot of size ${querySnapshot.size}`);
      querySnapshot.forEach(element => {
        this.renderNotifs(element, element.id);
        //element.data().id = element.id;
      });
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
  }

  render() {
    return (
      <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Notifications
          </DropdownToggle>
          <DropdownMenu right id="menu">
            Notifications
          </DropdownMenu>
        </UncontrolledDropdown>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Notifications);
/* <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Notifications
        </DropdownToggle>
        <DropdownMenu>
          <ul id="list"></ul>
        </DropdownMenu>
      </Dropdown> */