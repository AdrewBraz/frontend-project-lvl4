// @ts-check
import React from 'react';
import { format } from 'date-fns';
import { I18n } from 'react-redux-i18n';

import connect from '../connect';
import User from '../context';


const mapStateToProps = (state) => {
  const { currentChannelId } = state.chatState;
  const props = { currentChannelId };
  return props;
};


export default
@connect(mapStateToProps)
class NewMessageForm extends React.Component {
  static contextType = User;

  handleSubmit = async (value) => {
    const { addMessage, reset, currentChannelId } = this.props;
    const { userName } = this.context;
    const { text } = value;
    const postDate = format(new Date(), 'd/M/yyyy kk:mm:ss-zzzz');
    try {
      await addMessage(currentChannelId, { text, author: userName, date: postDate });
    } catch (e) {
      // throw new SubmissionError({ _error: e.channel });
    }
    reset();
  }

  render() {
    // const btn = I18n.t('application.add');
    return (
      <form className="form-inline align-items-end">
        {/* <div className="input-group flex-row w-100">
          <Field name="text" className="form-control"
          placeholder={I18n.t('application.newMessage')}
          required disabled={submitting} component="input" type="text" />
          <div className="input-group-prepend">
            <input type="submit" disabled={pristine || submitting}
            className="btn btn-primary btn-sm" value={btn} />
          </div>
        </div> */}
      </form>
    );
  }
}
