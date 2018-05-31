// index.js allows us to export the entire reducers folder //
import { combineReducers } from 'redux';

// import our reducers //
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer
});
