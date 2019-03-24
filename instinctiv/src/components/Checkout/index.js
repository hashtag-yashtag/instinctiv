import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
import "./checkout.css"
import {Button} from 'reactstrap';
export default class Checkout extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    toggleDarkLight = event => {
     var body = document.getElementById("body");
     var currentClass = body.className;
     body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
   }

    componentDidMount() {
    }

    onToken = (description) => (token, args) => {
        let t = this.props.stripe.createToken();
        console.log(t);
        console.log(token);

        axios.post('3RD_PARTY_SERVER', {
            description,
            source: token.id,
            amount: this.state.value,
            metadata: args
        }).then(() => {
            let token = this.props.stripe.createToken();
            console.log(token);
        })
            .catch(() => { this.errorPayment() });

        // TODO: Send the token information and any other
        // relevant information to your payment process
        // server, wait for the response, and update the UI
        // accordingly. How this is done is up to you. Using
        // XHR, fetch, or a GraphQL mutation is typical.
    };

    successPayment() {
        console.log("SUCCESS PAYMENT")
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
              <body id="body" class="light-mode">
              <Button color="primary" name="dark_light" onClick= {this.toggleDarkLight} title="Toggle dark/light mode">Change Theme</Button>
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
                    token={this.onToken}
                    zipCode
                />
            </body>
            </div>
        )
    }
}
