// @ts-check
import React from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import { Spinner } from 'react-bootstrap';

import connect from '../connect';
import User from '../context';
import routes from '../routes';


const mapStateToProps = (state) => {
  const { currentChannelId } = state.chatState;
  const props = { currentChannelId };
  return props;
};
export default
@connect(mapStateToProps)
class NewMessageForm extends React.Component {
  handleSubmit = async (value, { setSubmitting, resetForm }) => {
    const { currentChannelId } = this.props;
    const userName = this.context;
    const text = value.message;
    const postDate = new Date();
    const message = { text, author: userName, date: postDate };
    const data = { attributes: message };
    await axios.post(routes.channelMessagesPath(currentChannelId), { data });
    resetForm();
    setSubmitting(false);
  }

  render() {
    return (
      <Formik
        initialValues={{ message: '' }}
        onSubmit={this.handleSubmit}
        validate={(values) => {
          const errors = {};
          if (values.message.length === 0) {
            errors.message = 'Empty field';
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
              <input type="text" name="message" placeholder="message" onChange={handleChange} onBlur={handleBlur} value={values.message} className="form-control" />
              <div className="input-group-prepend">
                <button type="submit" disabled={isSubmitting} className=" btn btn-primary btn-sm">
                  {isSubmitting ? <Spinner animation="border" /> : 'add'}
                </button>
              </div>
            </div>
            {errors.message && touched.message}
          </form>
        )}
      </Formik>
    );
  }
}

NewMessageForm.contextType = User;
