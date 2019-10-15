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
  modalDelete: actions.modalStateDelete,
  modalClose: actions.modalStateClose,
  modalEdit: actions.modalStateEdit,
  removeChannel: actions.removeChannel,
};

export default @reduxForm({ form: 'editForm' })
@connect(mapStateToProps, actionCreators)
class ModalEditForm extends React.Component {
  handleClose = () => {
    const { modalClose } = this.props;
    modalClose();
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

  handleSwitchToEdit = () => {
    const { modalEdit } = this.props;
    modalEdit();
  }

  handleModalDelete = () => {
    const { modalDelete } = this.props;
    modalDelete();
  }

  handleDelete = async () => {
    const { removeChannel, channelEditId } = this.props;
    try {
      await removeChannel(channelEditId);
    } catch (e) {
      throw new SubmissionError({ _error: e.channel });
    }
    this.handleClose();
  }

  render() {
    const {
      modal, handleSubmit, submitting, pristine, error,
    } = this.props;
    return (
      <div>
        <Modal show={modal === 'edit'} onHide={this.handleClose}>
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
            <Button variant="primary" type="button" onClick={this.handleModalDelete}>
              Delete channel
            </Button>
          </Modal.Body>
        </Modal>
        <Modal show={modal === 'delete'} onHide={this.handleSwitchToEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure</p>
            <Button variant="danger" type="button" onClick={this.handleDelete}>
              Delete
            </Button>
            <Button variant="primary" type="button" onClick={this.handleSwitchToEdit}>
              Back to Editing
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
