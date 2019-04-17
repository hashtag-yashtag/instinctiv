import React from "react";
import logotrial from "./logotrial.png";
import MC104 from "./MC104.png";
import MC102 from "./MC102.png";
import MC103 from "./MC103.png";
import MC101 from "./MC101.png";

function Header() {
  return (
    <div className="landingImages">
      <img src={logotrial} alt="logotrial" />
      <img src={MC104} alt="MC104" />
      <Button
        size="lg"
        block
        buttonStyle={{ width: "100%" }}
        color="success"
        onClick={this.toggle}
      >
        LEARN MORE
        {this.props.buttonLabel}
      </Button>
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        className={this.props.className}
        centered
      >
        <ModalHeader toggle={this.toggle}>Tutorial</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>
            Gotcha!
          </Button>{" "}
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <img src={MC102} alt="MC102" />
      <Button
        size="lg"
        block
        buttonStyle={{ width: "100%" }}
        color="success"
        onClick={this.toggle}
      >
        LEARN MORE
        {this.props.buttonLabel}
      </Button>
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        className={this.props.className}
        centered
      >
        <ModalHeader toggle={this.toggle}>Tutorial</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>
            Gotcha!
          </Button>{" "}
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <img src={MC103} alt="MC103" />
      <Button
        size="lg"
        block
        buttonStyle={{ width: "100%" }}
        color="success"
        onClick={this.toggle}
      >
        LEARN MORE
        {this.props.buttonLabel}
      </Button>
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        className={this.props.className}
        centered
      >
        <ModalHeader toggle={this.toggle}>Tutorial</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>
            Gotcha!
          </Button>{" "}
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <img src={MC101} alt="MC101" />
      <Button
        size="lg"
        block
        buttonStyle={{ width: "100%" }}
        color="success"
        onClick={this.toggle}
      >
        LEARN MORE
        {this.props.buttonLabel}
      </Button>
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        className={this.props.className}
        centered
      >
        <ModalHeader toggle={this.toggle}>Tutorial</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>
            Gotcha!
          </Button>{" "}
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Header;
