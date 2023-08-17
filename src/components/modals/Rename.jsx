// @ts-check
import React, { useRef, useEffect } from 'react';
import {
  Modal, Button, Spinner, Alert,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import actions from '../../actions';
import routes from '../../routes';
import { channelSchema } from '../../validationSchemas';

const RenameModal = (props) => {
  const { modal } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef();

  const generateOnSubmit = ({ channelEditId }) => async (values) => {
    const { name } = values;
    try {
      const data = { attributes: { groupName: name } };
      await axios.patch(routes.channelPath(channelEditId), { data });
    } catch (e) {
      throw new Error('Something went wrong');
    }
    dispatch(actions.modalStateClose());
  };

  const handleClose = () => {
    dispatch(actions.modalStateClose());
  };

  const handleDelete = () => {
    dispatch(actions.modalStateDelete());
  };

  const form = useFormik({
    onSubmit: generateOnSubmit(props),
    validationSchema: channelSchema,
    initialValues: { name: '' },
    validateOnBlur: false,
  });

  useEffect(() => {
    if (inputRef && modal === 'renaming') {
      inputRef.current.focus();
    }
  });


  return (
    <Modal show={modal === 'renaming'} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('editChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column">
        <form className="form-inline mb-3" onSubmit={form.handleSubmit}>
          <div className="input-group flex-row w-100">
            <input type="text" name="name" ref={inputRef} placeholder={`${t('channelName')}`} onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.name} className="form-control" />
            <div className="input-group-prepend">
              <button type="submit" disabled={form.isValidating || form.isSubmitting} className=" btn btn-primary btn-sm">
                {form.isSubmitting ? <Spinner animation="border" /> : t('editBtn')}
              </button>
            </div>
          </div>
        </form>
        <Button variant="danger" type="button" onClick={handleDelete}>
          {t('deleteChannel')}
        </Button>
        {form.touched.name && form.errors.name ? (
          <Alert variant="danger">{form.errors.name}</Alert>
        ) : null}
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
