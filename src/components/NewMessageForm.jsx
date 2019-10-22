import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../actions';

import User from '../context';


const mapStateToProps = (state) => {
  const { currentChannelId } = state.chatState;
  const props = { currentChannelId };
  return props;
};

const actionCreators = {
  addMessage: actions.addMessage,
};

export default @reduxForm({ form: 'newChannelForm' })
@connect(mapStateToProps, actionCreators)
class NewMessageForm extends React.Component {
  static contextType = User;

  handleSubmit = async (value) => {
    const { addMessage, reset, currentChannelId } = this.props;
    const { name } = this.context;
    const { text } = value;
    const date = new Date();
    const postDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    try {
      await addMessage(currentChannelId, { text, author: name, date: postDate });
    } catch (e) {
      throw new SubmissionError({ _error: e.channel });
    }
    reset();
  }

  render() {
    const {
      handleSubmit, submitting, pristine, error,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)} className="form-inline align-items-end">
        <div className="input-group flex-row w-100">
          <Field name="text" className="form-control" placeholder="new message" required disabled={submitting} component="input" type="text" />
          <div className="input-group-prepend">
            <input type="submit" disabled={pristine || submitting} className="btn btn-primary btn-sm" value="Add" />
          </div>
        </div>
        {error && <div className="ml-3">{error}</div>}
      </form>
    );
  }
}
