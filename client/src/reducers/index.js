// index.js allows us to export the entire reducers folder //
import { combineReducers } from 'redux';

// import our reducers //
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

// import redux-form reducer //
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer
});
