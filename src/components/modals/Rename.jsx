// @ts-check
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { I18n } from 'react-redux-i18n';
import axios from 'axios';

import routes from '../../routes';
import connect from '../../connect';
import Spinner from '../Spinner';

const mapStateToProps = (state) => {
  const { chatState, channels } = state;
  const { modal, channelEditId } = chatState;
  const { ByIds } = channels;
  const props = { channelEditId, modal, ByIds };
  return props;
};


export default @connect(mapStateToProps)
class RenameModal extends React.Component {
    handleClose = () => {
      const { modalStateClose } = this.props;
      modalStateClose();
    }

  generateOnSubmit = async (name, { resetForm, setSubmitting }) => {
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

  handleSwitchToDelete = () => {
    const { modalStateDelete } = this.props;
    modalStateDelete();
  }

    renderForm = () => {
      const translations = {
        btn: 'editBtn',
        placeholder: 'channelName',
      };
      return (
        <Formik
          initialValues={{ name: '' }}
          onSubmit={this.generateOnSubmit}
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
                <input type="text" name="name" placeholder={I18n.t(`application.${translations.placeholder}`)} onChange={handleChange} onBlur={handleBlur} value={values.name} className="form-control" />
                <div className="input-group-prepend">
                  <button type="submit" disabled={isSubmitting} className=" btn btn-primary btn-sm">
                    {isSubmitting ? <Spinner /> : I18n.t(`application.${translations.btn}`)}
                  </button>
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
        <Modal show={modal === 'renaming'} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Channel</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column">
            {this.renderForm()}
            <Button variant="danger" type="button" onClick={this.handleSwitchToDelete}>
              {I18n.t('application.deleteBtn')}
            </Button>
          </Modal.Body>
        </Modal>
      );
    }
}
