// @ts-check
import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Modal } from 'react-bootstrap';
import { I18n } from 'react-redux-i18n';

import routes from '../../routes';
import Spinner from '../Spinner';


const generateOnSubmit = ({ modalStateClose }) => async (values) => {
  const { name } = values;
  try {
    const data = { attributes: { name } };
    await axios.post(routes.channelsPath(), { data });
  } catch (e) {
    throw new Error('Something went wrong');
  }
  modalStateClose();
};

const AddModal = (props) => {
  const { modal, modalStateClose } = props;

  const translations = {
    btn: 'addBtn',
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
    <Modal show={modal !== 'close'} onHide={modalStateClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
