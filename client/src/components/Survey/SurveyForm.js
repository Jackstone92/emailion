// SurveyForm shows a form for a user to add input //
import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

// import redux form //
import { reduxForm, Field } from 'redux-form';

// import SurveyField //
import SurveyField from './SurveyField';

// import validateEmails //
import validateEmails from '../../utils/validateEmails';

import formFields from './formFields';

class SurveyForm extends Component {
  // helper function to help render surveyfields //
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {/* field requires type, name and component */}
          {this.renderFields()}

          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>

          <button
            className="btn waves-effect waves-light right white-text green accent-4"
            type="submit"
          >
            Next
            <i className="material-icons right">navigate_next</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  // values is object with all values submitted by form //
  // returns object - if empty, no problems. If properties, form values must be invalid //
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

// wire up reduxform to component //
export default reduxForm({
  // handle validation //
  validate,
  // form is the form name child in redux so we can have multiple forms //
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
