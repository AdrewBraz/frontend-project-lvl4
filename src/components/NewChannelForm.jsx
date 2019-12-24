// @ts-check
import React from 'react';
import { Formik } from 'formik';
import { I18n } from 'react-redux-i18n';
import axios from 'axios';
import routes from '../routes';


import connect from '../connect';

const mapStateToProps = (state) => {
  const { channels } = state;
  const props = {
    channels,
  };
  return props;
};

export default
@connect(mapStateToProps)
class NewChannelForm extends React.Component {
    handleSubmitForm = async (name, { resetForm, setSubmitting }) => {
      try {
        const data = { attributes: name };
        await axios.post(routes.channelsPath(), { data });
        resetForm();
        setSubmitting(false);
      } catch (e) {
        throw new Error('Something went wrong');
      }
    }

    render() {
      return (
        <Formik
          initialValues={{ name: '' }}
          onSubmit={this.handleSubmitForm}
          validate={(values) => {
            const errors = {};
            if (values.name.length === 0) {
              errors.name = 'Empty field';
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
            <form className="form-inline" onSubmit={handleSubmit}>
              <div className="input-group flex-row w-100">
                <input
                  type="text"
                  name="name"
                  placeholder={I18n.t('application.newChannel')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className="form-control"
                />
                <div className="input-group-prepend">
                  <input
                    type="submit"
                    disabled={isSubmitting}
                    className=" btn btn-primary btn-sm"
                    value={I18n.t('application.add')}
                  />
                </div>
              </div>
              {errors.name && touched.name}
            </form>
          )}
        </Formik>
      );
    }
}
