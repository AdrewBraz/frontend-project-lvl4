// @ts-check
import React from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import { I18n } from 'react-redux-i18n';
import { Formik } from 'formik';

import connect from '../connect';
import User from '../context';
import routes from '../routes';
import Spinner from './Spinner';


const mapStateToProps = (state) => {
  const { currentChannelId } = state.chatState;
  const props = { currentChannelId };
  return props;
};
export default
@connect(mapStateToProps)
class NewMessageForm extends React.Component {
  static contextType = User;

  handleSubmit = async (value, { setSubmitting, resetForm }) => {
    const { currentChannelId } = this.props;
    const { userName } = this.context;
    const { text } = value;
    const postDate = format(new Date(), 'd/M/yyyy kk:mm:ss-zzzz');
    const message = { text, author: userName, date: postDate };
    try {
      const data = { attributes: message };
      await axios.post(routes.channelMessagesPath(currentChannelId), { data });
      resetForm();
      setSubmitting(false);
    } catch (e) {
      throw new Error(e);
    }
  }

  render() {
    const translations = {
      btn: 'addBtn',
      placeholder: 'newMessage',
    };
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
              <input type="text" name="message" placeholder={I18n.t(`application.${translations.placeholder}`)} onChange={handleChange} onBlur={handleBlur} value={values.message} className="form-control" />
              <div className="input-group-prepend">
                <button type="submit" disabled={isSubmitting} className=" btn btn-primary btn-sm">
                  {isSubmitting ? <Spinner /> : I18n.t(`application.${translations.btn}`)}
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
