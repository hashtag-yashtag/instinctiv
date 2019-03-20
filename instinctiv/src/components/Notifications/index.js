import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu} from 'reactstrap';

export default class Example extends React.Component {
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

  render() {
    return (
      <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Notifications
        </DropdownToggle>
        <DropdownMenu>
          <p>No new notifications</p>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
    );
  }
}
