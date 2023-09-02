// @ts-check
import React from 'react';
import axios from '../../http';
import { Modal, Spinner, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import { useFormik } from 'formik';

import routes from '../../routes';
import actions from '../../actions';
import { fileSchema } from '../../validationSchemas';


const Profile = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {userId, userName, url} = useSelector(state => state.chatState);
  const { modal } = props;


  const generateOnSubmit = () => async (values) => {
    const file = values.file
    const formData = new FormData()
    formData.append('file', file)
    try {
      const result = await axios.post(routes.profilePath(userId), formData);
      const updatedProfile = result.data
      dispatch(actions.updateProfile(updatedProfile ));
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
    initialValues: {file: ''},
    validationSchema: fileSchema
  });

  return (
    <Modal show={modal !== 'close'} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <section className="vh-25" >
        <form action='' className="form-inline mb-3" onSubmit={form.handleSubmit}>
          <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                  <div >
                  <div className="card" style={{'borderRadius': "15px"}}>
                      <div className="card-body text-center">
                      <div className="mt-3 mb-4">
                          <label  htmlFor="file">
                              <Image roundedCircle  src={url}
                              className="img-fluid" style={{"width": "100px"}} />
                              <input name='file' onChange={(e) => {form.setFieldValue("file", e.currentTarget.files[0])}} type="file" id="file"  style={{"display": "none"}}/>
                          </label>
                      </div>
                      <div className="input-group-prepend">
                        <button type="submit" disabled={form.isValidating || form.isSubmitting} className=" btn btn-primary btn-sm">
                          {form.isSubmitting ? <Spinner animation="border" /> : t('addChannel')}
                        </button>
                      </div>
                      <h4 className="mb-2">{t("logUser")} {userName}</h4>
                      </div>
                  </div>

                  </div>
              </div>
          </div>
        </form>
    </section>
      </Modal.Body>
    </Modal>
  );
};

export default Profile;