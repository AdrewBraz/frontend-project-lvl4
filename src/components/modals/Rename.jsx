// @ts-check
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { I18n } from 'react-redux-i18n';
import axios from 'axios';

import routes from '../../routes';
import Spinner from '../Spinner';


const generateOnSubmit = ({ modalStateClose, channelEditId }) => async (values) => {
  const { name } = values;
  try {
    const data = { attributes: { name } };
    await axios.patch(routes.channelPath(channelEditId), { data });
  } catch (e) {
    throw new Error('Something went wrong');
  }
  modalStateClose();
};

const RenameModal = (props) => {
  const { modal, modalStateDelete, modalStateClose } = props;

  const translations = {
    btn: 'editBtn',
    placeholder: 'channelName',
  };

  const validate = (values) => {
    const errors = {};
    if (values.name.length === 0) {
      errors.name = 'Empty field';
    }
    return errors;
  };

  const form = useFormik({
    onSubmit: generateOnSubmit(props),
    validate,
    initialValues: { name: '' },
  });

  return (
    <Modal show={modal === 'renaming'} onHide={modalStateClose}>
      <Modal.Header closeButton>
        <Modal.Title>{I18n.t('application.editChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column">
        <form className="form-inline mb-3" onSubmit={form.handleSubmit}>
          <div className="input-group flex-row w-100">
            <input type="text" name="name" placeholder={I18n.t(`application.${translations.placeholder}`)} onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.name} className="form-control" />
            <div className="input-group-prepend">
              <button type="submit" disabled={form.isValidating} className=" btn btn-primary btn-sm">
                {form.isSubmitting ? <Spinner /> : I18n.t(`application.${translations.btn}`)}
              </button>
            </div>
          </div>
          {form.errors.name && form.touched.name}
        </form>
        <Button variant="danger" type="button" onClick={() => modalStateDelete()}>
          {I18n.t('application.deleteBtn')}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
