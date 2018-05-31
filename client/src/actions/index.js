// handles all action creators //
import axios from 'axios';

// import action types //
import { FETCH_USER } from './types';

// define action creator //
// action creator using reduxThunk //
// return a function instead of a direct action //
// reduxThunk middleware will automatically call function when it finds one //
// dispatch an action after the asynchronous request has been resolved //
export const fetchUser = () => async dispatch => {
  // make async request //
  const res = await axios.get('/api/current_user');
  // dispatch action when we get a response //
  // just return res.data since we don't really need any of the other response properties //
  dispatch({ type: FETCH_USER, payload: res.data });
};

// handle stripe token after payment //
export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  // return exact same user model with updated number of credits //
  dispatch({ type: FETCH_USER, payload: res.data });
};
