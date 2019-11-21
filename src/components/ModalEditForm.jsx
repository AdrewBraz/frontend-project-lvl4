// @ts-check
import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';
import { I18n } from 'react-redux-i18n';

import connect from '../connect';

const mapStateToProps = (state) => {
  const { chatState, channels } = state;
  const { channelEditId, modal } = chatState;
  const { ByIds } = channels;
  const props = { channelEditId, modal, ByIds };
  return props;
};

export default @reduxForm({ form: 'editForm' })
@connect(mapStateToProps)
class ModalEditForm extends React.Component {
  handleClose = () => {
    const { modalStateClose } = this.props;
    modalStateClose();
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

  handleSwitchToEdit = (e) => {
    e.preventDefault();
    const { modalStateEdit, channelEditId } = this.props;
    modalStateEdit({ id: channelEditId });
  }

  handleModalDelete = () => {
    const { modalStateDelete } = this.props;
    modalStateDelete();
  }

  handleRemoveChannel = async () => {
    const { removeChannel, channelEditId } = this.props;
    try {
      await removeChannel(channelEditId);
    } catch (e) {
      throw new Error(e);
    }
    this.handleClose();
  }

  render() {
    const {
      modal, handleSubmit, submitting, pristine, error, channelEditId, ByIds,
    } = this.props;
    const channel = ByIds[channelEditId];
    const channelName = channel ? channel.name : null;
    return (
      <div>
        <Modal show={modal === 'edit'} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Channel</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column">
            <form onSubmit={handleSubmit(this.handleRename)} className="form-inline mb-3">
              <div className="input-group flex-row w-100">
                <Field placeholder={channelName} className="form-control" name="name" required disabled={submitting} component="input" type="text" />
                <div className="input-group-prepend">
                  <Button variant="primary" type="submit" disabled={pristine || submitting}>
                    Save Changes
                  </Button>
                </div>
                {error && <div className="ml-3">{error}</div>}
              </div>
            </form>
            <Button variant="primary" type="button" onClick={this.handleModalDelete}>
              Delete channel
            </Button>
          </Modal.Body>
        </Modal>
        <Modal show={modal === 'delete'} onHide={this.handleSwitchToEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Channel</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column align-items-center">
            <p className="pb-3 border-bottom border-dark">Are you sure you want to delete this channel?</p>
            <div className="d-flex justify-content-around">
              <Button className="mr-3" variant="danger" type="button" onClick={this.handleRemoveChannel}>
                Delete
              </Button>
              <Button className="ml-3" variant="primary" type="button" onClick={this.handleSwitchToEdit}>
                Back to Editing
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
