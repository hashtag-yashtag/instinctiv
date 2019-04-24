import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { AuthUserContext, withAuthorization } from '../Session';
import "./checkout.css"

class Checkout extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.balance = 0;
        this.db = null;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        this.db = this.props.firebase.db;
        this.db.collection("Users").doc(this.props.firebase.auth.O).onSnapshot(docSnapshot => {
            console.log(`Received doc snapshot: docSnapshot`, docSnapshot.data());
            this.balance = docSnapshot.data().balance
          }, err => {
            console.log(`Encountered error: ${err}`);
        });
    }

    onToken = (description) => (token, args) => {
        // let t = this.props.stripe.createToken(token) ;
        // console.log(t);
        console.log(token);

        if (token != null) {
            this.successPayment()
        }
        else {
            this.errorPayment()
        }

        // TODO: Send the token information and any other
        // relevant information to your payment process
        // server, wait for the response, and update the UI
        // accordingly. How this is done is up to you. Using
        // XHR, fetch, or a GraphQL mutation is typical.
    };

    successPayment() {
        console.log("SUCCESS PAYMENT")
        
        const newBalance = Number(this.state.value) + this.balance
        this.db.collection("Users").doc(this.props.firebase.auth.O).update({
            "balance": newBalance
        });

        this.db.collection("Users").doc(this.props.firebase.auth.O).onSnapshot(docSnapshot => {
            console.log(`Received doc snapshot: docSnapshot`, docSnapshot.data());
            this.balance = docSnapshot.data().balance
          }, err => {
            console.log(`Encountered error: ${err}`);
        });
    }

    errorPayment() {
        console.log("ERROR PAYMERNT")
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
    }



    render() {
        return (

            <div class="align-center">
                <h4>Buy Tokens</h4>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="number"
                        id="tokens"
                        name="tokens"
                        min="100"
                        max="100000"
                        placeholder="Number of Tokens"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />

                </form>

                <StripeCheckout
                    amount={this.state.value}
                    billingAddress
                    description="Buy Instinctiv Tokens"
                    locale="auto"
                    name="instinctiv"
                    stripeKey="pk_test_fSeP0u5pxF5vEmLguwFpf80Z"
                    token={this.onToken()}
                    zipCode
                />
            </div>
        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Checkout);
