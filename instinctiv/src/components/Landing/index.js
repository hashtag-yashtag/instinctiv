import React from "react";
import logotrial from "./logotrial.png";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import MC104 from "./MC104.png";
import MC102 from "./MC102.png";
import MC103 from "./MC103.png";
import MC101 from "./MC101.png";

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
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
                <Button color="success">STOCKS</Button>
                <Button color="success">BETS</Button>
                <Button color="success">USER PROFILE</Button>
                <Button color="success">NEWS</Button>
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
