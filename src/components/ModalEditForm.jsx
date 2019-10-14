import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { chatState, channels } = state;
  const { channelEditId, modal } = chatState;
  const { ByIds } = channels;
  const props = { channelEditId, modal, ByIds };
  return props;
};

const actionCreators = {
  renameChannel: actions.renameChannel,
  modalClosed: actions.modalClosed,
};

export default @reduxForm({ form: 'editForm' })
@connect(mapStateToProps, actionCreators)
class ModalEditForm extends React.Component {
  handleClose = () => {
    const { modalClosed } = this.props;
    modalClosed();
  }

  handleRename = async (name) => {
    const { renameChannel, channelEditId } = this.props;
    try {
      await renameChannel(channelEditId, name);
    } catch (e) {
      throw new SubmissionError({ _error: e.channel });
    }
    this.handleClose();
  };

  render() {
    const {
      modal, handleSubmit, submitting, pristine, error,
    } = this.props;
    return (
      <div>
        <Modal show={modal === 'opened'} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(this.handleRename)} className="form-inline">
              <div className="input-group flex-row">
                <Field placeholder="dd" className="form-control" name="name" required disabled={submitting} component="input" type="text" />
                {error && <div className="ml-3">{error}</div>}
              </div>
              <Button variant="primary" type="submit" disabled={pristine || submitting}>
                Save Changes
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
