import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import connect from '../connect';

const mapStateToProps = (state) => {
  const { channels } = state;
  const props = {
    channels,
  };
  return props;
};

export default @reduxForm({ form: 'newChannelForm' })
@connect(mapStateToProps)
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
          <div className="input-group flex-row w-100">
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
