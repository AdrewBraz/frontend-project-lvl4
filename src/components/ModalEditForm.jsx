// @ts-check
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { I18n } from 'react-redux-i18n';
import axios from 'axios';

import routes from '../routes';
import connect from '../connect';
import Form from './Form';

const mapStateToProps = (state) => {
  const { chatState, channels } = state;
  const { modal, channelEditId } = chatState;
  const { ByIds } = channels;
  const props = { channelEditId, modal, ByIds };
  return props;
};

export default
@connect(mapStateToProps)
class ModalEditForm extends React.Component {
  handleClose = () => {
    const { modalStateClose } = this.props;
    modalStateClose();
  }

  handleRename = async (name, { resetForm, setSubmitting }) => {
    const { channelEditId } = this.props;
    try {
      const data = { attributes: name };
      await axios.patch(routes.channelPath(channelEditId), { data });
      resetForm();
      setSubmitting(false);
    } catch (e) {
      throw new Error('Something went wrong');
    }
    this.handleClose();
  };

  handleSwitchToEdit = () => {
    const { modalStateEdit, channelEditId } = this.props;
    modalStateEdit({ id: channelEditId });
  }

  handleModalDelete = () => {
    const { modalStateDelete } = this.props;
    modalStateDelete();
  }

  handleRemoveChannel = async () => {
    const { channelEditId } = this.props;
    try {
      await await axios.delete(routes.channelPath(channelEditId));
    } catch (e) {
      throw new Error(e);
    }
    this.handleClose();
  }

  render() {
    const { modal } = this.props;
    const translations = {
      btn: 'editBtn',
      placeholder: 'channelName',
    };
    return (
      <div>
        <Modal show={modal === 'edit'} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Channel</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column">
            <Form name="name" submitForm={this.handleRename} translation={translations} />
            <Button variant="primary" type="button" onClick={this.handleModalDelete}>
              {I18n.t('application.deleteBtn')}
            </Button>
          </Modal.Body>
        </Modal>
        <Modal show={modal === 'delete'} onHide={this.handleSwitchToEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Channel</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column align-items-center">
            <p className="pb-3 border-bottom border-dark">
              {I18n.t('application.deleteQuestion')}
            </p>
            <div className="d-flex justify-content-around">
              <Button className="mr-3" variant="danger" type="button" onClick={this.handleRemoveChannel}>
                {I18n.t('application.deleteBtn')}
              </Button>
              <Button className="ml-3" variant="primary" type="button" onClick={this.handleSwitchToEdit}>
                {I18n.t('application.backToEdit')}
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
