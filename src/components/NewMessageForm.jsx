// @ts-check
import React from 'react';
import { format } from 'date-fns';
import axios from 'axios';


import connect from '../connect';
import User from '../context';
import routes from '../routes';
import Form from './Form';


const mapStateToProps = (state) => {
  const { currentChannelId } = state.channels;
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
      // <form className="form-inline align-items-end">
      //   {/* <div className="input-group flex-row w-100">
      //     <Field name="text" className="form-control"
      //     placeholder={I18n.t('application.newMessage')}
      //     required disabled={submitting} component="input" type="text" />
      //     <div className="input-group-prepend">
      //       <input type="submit" disabled={pristine || submitting}
      //       className="btn btn-primary btn-sm" value={btn} />
      //     </div>
      //   </div> */}
      // </form>
      <Form name="text" submitForm={this.handleSubmit} translation={translations} />
    );
  }
}
