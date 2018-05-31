import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

import * as actions from '../../actions';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emailion"
        description="Top up your email credits"
        amount={500} // cents //
        // callback function to handle token //
        token={token => this.props.handleToken(token)}
        // stripe key //
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <a className="green accent-4">Add Credits</a>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
