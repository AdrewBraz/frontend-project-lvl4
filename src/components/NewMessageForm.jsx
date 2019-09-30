import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const props = {
    text: state.text,
  };
  return props;
};

const actionCreators = {
  addMessage: actions.addMessage,
};

class NewMessageForm extends React.Component {
     handleSubmit = (values) => {
       const { addMessage } = this.props;
       console.log(values);
       const message = { ...values, id: _.uniqueId() };
       addMessage({ message });
       //    try {
       //      await addMessage({ message });
       //    } catch (e) {
       //      throw new SubmissionError({ _error: e.message });
       //    }
       //    reset();
     }

     render() {
       const {
         handleSubmit, submitting, pristine, error,
       } = this.props;
       return (
       // BEGIN (write your solution here)
         <form onSubmit={handleSubmit(this.handleSubmit)} className="form-inline">
           <div className="form-group mx-3">
             <Field name="text" required disabled={submitting} component="input" type="text" />
           </div>
           <input type="submit" disabled={pristine || submitting} className="btn btn-primary btn-sm" value="Add" />
           {error && <div className="ml-3">{error}</div>}
         </form>
       // END
       );
     }
}


const ConnectedNewMessageForm = connect(mapStateToProps, actionCreators)(NewMessageForm);
export default reduxForm({
  form: 'newMessage',
})(ConnectedNewMessageForm);
