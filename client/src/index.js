// primary file for redux and startup location //
import React from 'react';
import ReactDOM from 'react-dom';
// import redux //
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import redux-thunk //
import reduxThunk from 'redux-thunk';

// import App component //
import App from './components/App';

// import reducers from ./reducers/index.js //
import reducers from './reducers';

// import materializeCSS //
import 'materialize-css/dist/css/materialize.min.css';

// development only axios helpers //
import axios from 'axios';
window.axios = axios;

// create redux store //
// createStore(<reducers>, <initialState>, <applyMiddleware call>) //
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// create redux store at top-level and make App component child of provider (glue between react and redux) //
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// console.log('STRIPE KEY IS: ', process.env.REACT_APP_STRIPE_KEY);
// console.log('Environment is: ', process.env.NODE_ENV);
