// @ts-check
import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Modal, Spinner, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import routes from '../../routes';
import actions from '../../actions';
import { channelSchema } from '../../validationSchemas';


const AddModal = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { modal } = props;
  const inputRef = useRef();

  const generateOnSubmit = () => async (values) => {
    const { name } = values;
    try {
      const data = { attributes: { name } };
      await axios.post(routes.channelsPath(), { data });
    } catch (e) {
      throw new Error('Something went wrong');
    }
    dispatch(actions.modalStateClose());
  };

  const closeModal = () => {
    dispatch(actions.modalStateClose());
  };

  const form = useFormik({
    onSubmit: generateOnSubmit(),
    validationSchema: channelSchema,
    initialValues: { name: '' },
    validateOnBlur: false,
  });

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  }, [null]);

  return (
    <Modal show={modal !== 'close'} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="form-inline mb-3" onSubmit={form.handleSubmit}>
          <div className="input-group flex-row w-100">
            <input type="text" name="name" placeholder={`${t('channelName')}`} ref={inputRef} onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.name} className="form-control" />
            <div className="input-group-prepend">
              <button type="submit" disabled={form.isValidating || form.isSubmitting} className=" btn btn-primary btn-sm">
                {form.isSubmitting ? <Spinner animation="border" /> : t('addChannel')}
              </button>
            </div>
          </div>
        </form>
        {form.touched.name && form.errors.name ? (
          <Alert variant="danger">{form.errors.name}</Alert>
        ) : null}
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
