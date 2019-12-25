// @ts-check
import React from 'react';
import { Formik } from 'formik';
import { I18n } from 'react-redux-i18n';
import Spinner from './Spinner';

const Form = ({ name, submitForm, translation }) => (
  <Formik
    initialValues={{ [name]: '' }}
    onSubmit={submitForm}
    validate={(values) => {
      const errors = {};
      if (values[name].length === 0) {
        errors[name] = 'Empty field';
      }
      return errors;
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
    }) => (
      <form className="form-inline mb-3" onSubmit={handleSubmit}>
        <div className="input-group flex-row w-100">
          <input type="text" name={`${name}`} placeholder={I18n.t(`application.${translation.placeholder}`)} onChange={handleChange} onBlur={handleBlur} value={values[name]} className="form-control" />
          <div className="input-group-prepend">
            <button type="submit" disabled={isSubmitting} className=" btn btn-primary btn-sm">
              {isSubmitting ? <Spinner /> : I18n.t(`application.${translation.btn}`)}
            </button>
          </div>
        </div>
        {errors[name] && touched[name]}
      </form>
    )}
  </Formik>
);

export default Form;
