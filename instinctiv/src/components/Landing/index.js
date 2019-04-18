import React from "react";
import logotrial from "./logotrial.png";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
import MC104 from "./MC104.png";
import MC102 from "./MC102.png";
import MC103 from "./MC103.png";
import MC101 from "./MC101.png";
import Parth_104_copy from "./Parth_104_copy.png";

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      popoverOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <img src={logotrial} alt="logotrial" />
        <Button
          size="lg"
          block
          buttonStyle={{ width: "100%" }}
          color="success"
          onClick={this.toggle}
        >
          <h1>ABOUT US</h1>
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          centered
        >
          <ModalHeader toggle={this.toggle} centered>
            <h2>INSTINCTIV</h2>
          </ModalHeader>
          <ModalBody>
            Stock prediction models are about as accurate as the flip of a coin
            even though the models use sophisticated technologies such as Neural
            Networks, Deep Learning technologies and Natural Language
            Processing. Our idea is to simplify this process by our crowdsourced
            prediction platform where individuals can leave their predictions
            voluntarily by turning this into a game of sorts. To do so, you
            would have to place a “BET” on the movement of the Average Daily
            Price of stock(s) (UP or DOWN). Depending on the movement of the
            Average Daily Price, you will either win or lost “TOKENS”.
          </ModalBody>
          <ModalFooter>
            <ButtonToolbar>
              <ButtonGroup>
                <Button id="Popover1" type="button" color="success">
                  STOCKS
                </Button>
                <UncontrolledPopover
                  trigger="legacy"
                  placement="bottom"
                  target="Popover1"
                >
                  <PopoverHeader>STOCKS</PopoverHeader>
                  <PopoverBody>
                    <img src={Parth_104_copy} alt="Parth_104_copy" />
                    Legacy is a reactstrap special trigger value (outside of
                    bootstrap's spec/standard). Before reactstrap correctly
                    supported click and focus, it had a hybrid which was very
                    useful and has been brought back as trigger="legacy". One
                    advantage of the legacy trigger is that it allows the
                    popover text to be selected while also closing when clicking
                    outside the triggering element and popover itself.
                  </PopoverBody>
                </UncontrolledPopover>
                <Button id="Popover2" type="button" color="success">
                  BETS
                </Button>
                <UncontrolledPopover
                  trigger="legacy"
                  placement="bottom"
                  target="Popover2"
                >
                  <PopoverHeader>BETS</PopoverHeader>
                  <PopoverBody>
                    Legacy is a reactstrap special trigger value (outside of
                    bootstrap's spec/standard). Before reactstrap correctly
                    supported click and focus, it had a hybrid which was very
                    useful and has been brought back as trigger="legacy". One
                    advantage of the legacy trigger is that it allows the
                    popover text to be selected while also closing when clicking
                    outside the triggering element and popover itself.
                  </PopoverBody>
                </UncontrolledPopover>
                <Button id="Popover3" type="button" color="success">
                  USER PROFILE
                </Button>
                <UncontrolledPopover
                  trigger="legacy"
                  placement="bottom"
                  target="Popover3"
                >
                  <PopoverHeader>USER PROFILE</PopoverHeader>
                  <PopoverBody>
                    Legacy is a reactstrap special trigger value (outside of
                    bootstrap's spec/standard). Before reactstrap correctly
                    supported click and focus, it had a hybrid which was very
                    useful and has been brought back as trigger="legacy". One
                    advantage of the legacy trigger is that it allows the
                    popover text to be selected while also closing when clicking
                    outside the triggering element and popover itself.
                  </PopoverBody>
                </UncontrolledPopover>
                <Button id="Popover4" type="button" color="success">
                  NEWS
                </Button>
                <UncontrolledPopover
                  trigger="legacy"
                  placement="bottom"
                  target="Popover4"
                >
                  <PopoverHeader>NEWS</PopoverHeader>
                  <PopoverBody>
                    Legacy is a reactstrap special trigger value (outside of
                    bootstrap's spec/standard). Before reactstrap correctly
                    supported click and focus, it had a hybrid which was very
                    useful and has been brought back as trigger="legacy". One
                    advantage of the legacy trigger is that it allows the
                    popover text to be selected while also closing when clicking
                    outside the triggering element and popover itself.
                  </PopoverBody>
                </UncontrolledPopover>
              </ButtonGroup>
            </ButtonToolbar>
          </ModalFooter>
        </Modal>
        <img src={MC104} alt="MC104" />
        <img src={MC102} alt="MC102" />
        <img src={MC103} alt="MC103" />
        <img src={MC101} alt="MC101" />
      </div>
    );
  }
}

export default ModalExample;
