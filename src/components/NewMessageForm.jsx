// @ts-check

import React, { useContext, useEffect, useRef } from 'react';
import axios from '../http';
import { useFormik } from 'formik';
import { Spinner, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { messageSchema } from '../validationSchemas';
import { useSelector } from 'react-redux/es/exports';

import routes from '../routes';
import { setSubmitFailed } from 'redux-form';

const generateOnSubmit = ({ currentChannelId }, {userId, userName, draggedFile, setFile}) => async (values, { resetForm }) => {
  const text = values.message;
  const file = draggedFile ? draggedFile : values.file
  console.log(file)
  const formData = new FormData()
  const postDate = new Date();
  const message = { text, userId, userName, date: postDate, file };
  for(let key in message){
    formData.append(key, message[key])
  }
  console.log(formData)
  await axios.post(routes.channelMessagesPath(currentChannelId), formData);
  setFile('') 
  resetForm();
};

const NewMessageForm = (props) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const { modal, file: draggedFile, setFile } = props;
  const userName = useSelector(state => state.chatState.userName);
  const userId = useSelector(state => state.chatState.userId);

  const form = useFormik({
    onSubmit: generateOnSubmit(props, {userId, userName, draggedFile, setFile}),
    validationSchema: messageSchema,
    initialValues: { message: '', file: ''},
  });

  useEffect(() => {
    if (inputRef && modal === 'closed') {
      inputRef.current.focus();
    }
  });

  return (
    <div>
      <form action='' className="form-inline mb-3" onSubmit={form.handleSubmit}>
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
          <input accept='image/*' id="input-b5" name="file" type="file" multiple onChange={(e) => {form.setFieldValue("file", e.currentTarget.files[0])}} onBlur={form.handleBlur} />
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
