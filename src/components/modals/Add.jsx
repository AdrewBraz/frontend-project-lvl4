// @ts-check
import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Modal } from 'react-bootstrap';
import { I18n } from 'react-redux-i18n';

import routes from '../../routes';
import Spinner from '../Spinner';

// const mapStateToProps = (state) => {
//   const { channels, chatState } = state;
//   const { modal } = chatState;
//   const props = {
//     channels,
//     modal,
//   };
//   return props;
// };

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

export default (props) => {
  const { modal, modalStateClose } = props;
  const f = useFormik({
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
        <form className="form-inline mb-3" onSubmit={f.handleSubmit}>
          <div className="input-group flex-row w-100">
            <input type="text" name="name" placeholder={I18n.t(`application.${translations.placeholder}`)} onChange={f.handleChange} onBlur={f.handleBlur} value={f.values.name} className="form-control" />
            <div className="input-group-prepend">
              <button type="submit" className=" btn btn-primary btn-sm">
                {f.isSubmitting ? <Spinner /> : I18n.t(`application.${translations.btn}`)}
              </button>
            </div>
          </div>
          {f.errors.name && f.touched.name}
        </form>
      </Modal.Body>
    </Modal>
  );
};
