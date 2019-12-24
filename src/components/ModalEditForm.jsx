// @ts-check
import React from 'react';
import { Formik } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import { I18n } from 'react-redux-i18n';

import axios from 'axios';
import routes from '../routes';
import connect from '../connect';

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

  renderForm = () => {
    const { channelEditId, ByIds } = this.props;
    const channel = ByIds.find(ch => ch.id === channelEditId);
    const channelName = channel ? channel.name : '';
    return (
      <Formik
        initialValues={{ name: '' }}
        onSubmit={this.handleRename}
        validate={(values) => {
          const errors = {};
          if (values.name.length === 0) {
            errors.name = 'Empty field';
          }
          return errors;
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form className="form-inline mb-3" onSubmit={handleSubmit}>
            <div className="input-group flex-row w-100">
              <input
                type="text"
                name="name"
                placeholder={channelName}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className="form-control"
              />
              <div className="input-group-prepend">
                <input
                  type="submit"
                  disabled={isSubmitting}
                  className=" btn btn-primary btn-sm"
                  value={I18n.t('application.add')}
                />
              </div>
            </div>
            {errors.name && touched.name}
          </form>
        )}
      </Formik>
    );
  }

  render() {
    const { modal } = this.props;
    return (
      <div>
        <Modal show={modal === 'edit'} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Channel</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column">
            {this.renderForm()}
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
