// auth reducer //
import { FETCH_USER } from '../actions/types';

// default state is null, indicating that by default we don't know if the user is logged in or not //
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      // return action.payload if user is logged in, otherwise false //
      return action.payload || false;

    default:
      return state;
  }
}
