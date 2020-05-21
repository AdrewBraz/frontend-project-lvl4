// @ts-check
import React, { useContext } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import User from '../context';
import routes from '../routes';

const generateOnSubmit = ({ currentChannelId }, userName) => async (values, { resetForm }) => {
  const text = values.message;
  const postDate = new Date();
  const message = { text, author: userName, date: postDate };
  const data = { attributes: message };
  await axios.post(routes.channelMessagesPath(currentChannelId), { data });
  resetForm();
};

const NewMessageForm = (props) => {
  const { t } = useTranslation();
  const validate = (values) => {
    const errors = {};
    if (values.message.length === 0) {
      errors.message = 'Empty field';
    }
    return errors;
  };

  const userName = useContext(User);


  const form = useFormik({
    onSubmit: generateOnSubmit(props, userName),
    validate,
    initialValues: { message: '' },
  });

  return (
    <div>
      <form className="form-inline mb-3" onSubmit={form.handleSubmit}>
        <div className="input-group flex-row w-100">
          <input
            type="text"
            name="message"
            placeholder={`${t('newMessage')}`}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.message}
            className="form-control"
          />
          <div className="input-group-prepend">
            <button type="submit" disabled={form.isValidating} className=" btn btn-primary btn-sm">
              {form.isSubmitting ? <Spinner animation="border" /> : t('addBtn')}
            </button>
          </div>
        </div>
        {form.errors.message && form.touched.message}
      </form>
    </div>
  );
};

export default NewMessageForm;
