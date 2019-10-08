import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { channels } = state;
  const props = {
    channels,
  };
  return props;
};

const actionCreators = {
  addChannel: actions.addChannel,
};

export default @reduxForm({ form: 'newChannelForm' })
@connect(mapStateToProps, actionCreators)
class NewChannelForm extends React.Component {
    handleSubmit = async (name) => {
      const { addChannel, reset } = this.props;
      try {
        await addChannel(name);
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
        <form onSubmit={handleSubmit(this.handleSubmit)} className="form-inline">
          <div className="input-group flex-row">
            <Field placeholder="new channel" className="form-control" name="name" required disabled={submitting} component="input" type="text" />
            <div className="input-group-prepend">
              <input type="submit" disabled={pristine || submitting} className=" btn btn-primary btn-sm" value="Add" />
            </div>
            {error && <div className="ml-3">{error}</div>}
          </div>
        </form>
      );
    }
}
