import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../actions';

import User from '../context';


const mapStateToProps = (state) => {
  const { currentChannelId } = state.channelState;
  const props = { currentChannelId };
  return props;
};

const actionCreators = {
  addMessage: actions.addMessage,
};

export default @reduxForm({ form: 'newChannelForm' })
@connect(mapStateToProps, actionCreators)
class NewMessageForm extends React.Component {
  handleSubmit = async (value) => {
    const { addMessage, reset, currentChannelId } = this.props;
    const { name } = this.context;
    const { text } = value;
    try {
      await addMessage(currentChannelId, { text, author: name });
    } catch (e) {
      throw new SubmissionError({ _error: e.channel });
    }
    reset();
  }

  static contextType = User;

  render() {
    const {
      handleSubmit, submitting, pristine, error,
    } = this.props;
    return (
    // BEGIN (write your solution here)
      <form onSubmit={handleSubmit(this.handleSubmit)} className="form-inline align-items-end">
        <div className="input-group flex-row">
          <Field name="text" className="form-control" placeholder="new message" required disabled={submitting} component="input" type="text" />
        </div>
        <div className="input-group-prepend">
          <input type="submit" disabled={pristine || submitting} className="btn btn-primary btn-sm" value="Add" />
        </div>
        {error && <div className="ml-3">{error}</div>}
      </form>
    // END
    );
  }
}
