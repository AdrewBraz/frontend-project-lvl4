// @ts-check

import React, { useContext, useEffect, useRef } from 'react';
import axios from '../http';
import { useFormik } from 'formik';
import { Spinner, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { messageSchema } from '../validationSchemas';
import { useSelector } from 'react-redux/es/exports';

import User from '../context';
import routes from '../routes';

const generateOnSubmit = ({ currentChannelId }, {userId, userName}) => async (values, { resetForm }) => {
  console.log(userId)
  const text = values.message;
  const postDate = new Date();
  const message = { text, author: {id: userId, userName: userName}, date: postDate };
  const data = { attributes: message };
  await axios.post(routes.channelMessagesPath(currentChannelId), { data });
  resetForm();
};

const NewMessageForm = (props) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const { modal } = props;
  const userName = useSelector(state => state.chatState.userName);
  const userId = useSelector(state => state.chatState.userId);

  const form = useFormik({
    onSubmit: generateOnSubmit(props, {userId, userName}),
    validationSchema: messageSchema,
    initialValues: { message: '' },
  });

  useEffect(() => {
    if (inputRef && modal === 'closed') {
      inputRef.current.focus();
    }
  });

  return (
    <div>
      <form className="form-inline mb-3" onSubmit={form.handleSubmit}>
        <div className="input-group flex-row w-100">
          <input
            type="text"
            name="message"
            ref={inputRef}
            placeholder={`${t('newMessage')}`}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.message}
            className="form-control"
          />
          <div className="input-group-prepend">
            <button type="submit" disabled={form.isValidating || form.isSubmitting} className=" btn btn-primary btn-sm">
              {form.isSubmitting ? <Spinner animation="border" /> : t('addBtn')}
            </button>
          </div>
        </div>
      </form>
      {form.touched.message && form.errors.message ? (
        <Alert variant="danger">{form.errors.message}</Alert>
      ) : null}
    </div>
  );
};

export default NewMessageForm;
