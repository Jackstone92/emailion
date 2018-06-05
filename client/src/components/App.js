// contains initial view layer setup and react router //
import React, { Component } from 'react';
// import react router //
import { BrowserRouter, Route } from 'react-router-dom';

// react redux connect //
import { connect } from 'react-redux';
// import all redux actions //
import * as actions from '../actions';

// import components //
import Header from './Header/Header';
import Landing from './Landing/Landing';
import Dashboard from './Dashboard/Dashboard';
import SurveyNew from './Survey/SurveyNew';

class App extends Component {
  componentDidMount() {
    // figure out current_user by calling fetchUser action //
    this.props.fetchUser();
  }

  render() {
    return (
      // div handles css //
      <div className="container">
        <BrowserRouter>
          {/* BrowserRouter only takes 1 child! */}
          <div>
            <Header />
            {/* exact prop ensures exact path displays component */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// redux connect //
export default connect(null, actions)(App);
