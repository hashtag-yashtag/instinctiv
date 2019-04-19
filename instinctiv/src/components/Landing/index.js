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
import MC106 from "./MC106.png";
import MC107 from "./MC107.png";
import MC103 from "./MC103.png";
import MC101 from "./MC101.png";
import MC105 from "./MC105.png";
import stockspopover from "./stockspopover.png";
import homestocks from "./homestocks.png";
import newsstocks from "./newsstocks.png";
import userprofilepopover from "./userprofilepopover.png";
import homenewfeed from "./homenewfeed.png";
import phonepop from "./phonepop.png";
import tokensbuy from "./tokensbuy.png";

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
          size="lg"
          block
        >
          <ModalHeader toggle={this.toggle} centered>
            <img src={logotrial} alt="logotrial" />
          </ModalHeader>
          <ModalBody>
            <h3>
              Stock prediction models are about as accurate as the flip of a
              coin even though the models use sophisticated technologies such as
              Neural Networks, Deep Learning technologies and Natural Language
              Processing. Our idea is to simplify this process by our
              crowdsourced prediction platform where individuals can leave their
              predictions voluntarily by turning this into a game of sorts. To
              do so, you would have to place a “BET” on the movement of the
              Average Daily Price of stock(s) (UP or DOWN). Depending on the
              movement of the Average Daily Price, you will either win or lost
              “TOKENS”.
            </h3>
          </ModalBody>
          <ModalFooter>
            Created By: Jade Fisher, Tanuj Yadav, Parthasarthi Taneja, Shafay
            Haq, Varun Kondapalli, Yash Gupta
          </ModalFooter>
        </Modal>
        <img src={MC104} alt="MC104" />
        <Button id="Popover2" type="button" color="success" size="lg" block>
          <h5>LEARN MORE</h5>
        </Button>
        <UncontrolledPopover
          trigger="legacy"
          placement="bottom"
          target="Popover2"
        >
          <PopoverHeader>HOME</PopoverHeader>
          <PopoverBody>
            <img src={homestocks} alt="homestocks" />
            With your customised, easy to use home page; navigation becomes a
            pleasure. Use the all inclusive predective search bar to search for
            users as well as stocks to expand your prfile, knowledge of stocks
            and hopefully your accuracy after betting on them. Constantly follow
            the searched stock in real time and also with the graphical history
            data of the stock.
          </PopoverBody>
        </UncontrolledPopover>

        <img src={MC102} alt="MC102" />
        <Button id="Popover3" type="button" color="success" size="lg" block>
          <h5>LEARN MORE</h5>
        </Button>
        <UncontrolledPopover
          trigger="legacy"
          placement="bottom"
          target="Popover3"
        >
          <PopoverHeader>USER PROFILE</PopoverHeader>
          <PopoverBody>
            <img src={userprofilepopover} alt="userprofilepopover" />
            Edit and customise your profile by changing the image or the
            username anytime. Kepp track of your accuracy calculated by the
            Instinctiv's formula and the balance tokens. Kepp viwing the
            notifications for accuracy change or if you're low on tokens.
          </PopoverBody>
        </UncontrolledPopover>
        <img src={MC106} alt="MC106" />
        <Button id="Popover6" type="button" color="success" size="lg" block>
          <h5>LEARN MORE</h5>
        </Button>
        <UncontrolledPopover
          trigger="legacy"
          placement="bottom"
          target="Popover6"
        >
          <PopoverHeader>TOKENS</PopoverHeader>
          <PopoverBody>
            <img src={tokensbuy} alt="tokensbuy" />
            Buy Instinctiv's tokens with your credit or debit card anytime
            through Instintiv's website anytime. Key in the number of tokens you
            want to buy and continue to the payments to pay securely through
            stripe to get the desired tokens.
          </PopoverBody>
        </UncontrolledPopover>
        <img src={MC107} alt="MC107" />
        <Button id="Popover7" type="button" color="success" size="lg" block>
          <h5>LEARN MORE</h5>
        </Button>
        <UncontrolledPopover
          trigger="legacy"
          placement="bottom"
          target="Popover7"
        >
          <PopoverHeader>MOBILE</PopoverHeader>
          <PopoverBody>
            <img src={phonepop} alt="phonepop" />
            With the fluidity and functionality of Instinctiv remaining same on
            the mobile platforms as well, you can now bet on the go. With just
            the same steps and the same user profile, you can easily continue
            doing what you did on the system. Easy to use and with proper fit,
            Instinctiv is as fun and competitive on the phone.
          </PopoverBody>
        </UncontrolledPopover>
        <img src={MC103} alt="MC103" />
        <Button id="Popover4" type="button" color="success" size="lg" block>
          <h5>LEARN MORE</h5>
        </Button>
        <UncontrolledPopover
          trigger="legacy"
          placement="bottom"
          target="Popover4"
        >
          <PopoverHeader>INFORMATION</PopoverHeader>
          <PopoverBody>
            <img src={stockspopover} alt="stockspopover" />
            In this era of digitalisation, information is the key. But also,
            information is everywhere. Instinctiv brings to you all the relevent
            information you need we think you might want to read up before
            betting on the stock and predicting its movememnts from the number
            of employee's to the location of its head quarters. All at your
            fingertips.
          </PopoverBody>
        </UncontrolledPopover>
        <img src={MC101} alt="MC101" />
        <Button id="Popover1" type="button" color="success" size="lg" block>
          <h5>LEARN MORE</h5>
        </Button>
        <UncontrolledPopover
          trigger="legacy"
          placement="bottom"
          target="Popover1"
          size="lg"
          block
        >
          <PopoverHeader>STOCK NEWS</PopoverHeader>
          <PopoverBody>
            <img src={newsstocks} alt="newsstocks" />
            Want to read up on all the news and NYT blogs, stalk Yahoo finance
            and have Bloomberg opened in the next tab? No, you don't. instinctiv
            provides you all the news and trending activities of the company
            just below the stock's graph because we intend to provide one stop
            solution for all the stock predicting activities.
          </PopoverBody>
        </UncontrolledPopover>
        <img src={MC105} alt="MC105" />
        <Button id="Popover5" type="button" color="success" size="lg" block>
          <h5>LEARN MORE</h5>
        </Button>
        <UncontrolledPopover
          trigger="legacy"
          placement="bottom"
          target="Popover5"
        >
          <PopoverHeader>FEED</PopoverHeader>
          <PopoverBody>
            <img src={homenewfeed} alt="homenewfeed" />
            Just because you're new you don't to lack behind. If you don't know
            anything and just want to go with flow in the beginning, it is most
            definitely okay. Keep following the most popular stocks on your home
            feed to know what's been the favourite with the betters and
            investors. Also, tip of the day tells you the most betted stock of
            the day. So, it is quite literally the safest bet of the day.
          </PopoverBody>
        </UncontrolledPopover>
      </div>
    );
  }
}

export default ModalExample;
