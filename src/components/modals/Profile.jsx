// @ts-check
import React, { useRef, useEffect } from 'react';
import axios from '../../http';
import { Modal, Spinner, Alert, Badge, Button, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import cn from 'classnames';

import SubscriptionButton from '../Buttons/SubscriptionButton';
import routes from '../../routes';
import actions from '../../actions';


const Profile = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentChannel = useSelector((state) => state.chatState.currentChannelId);
  const userId = useSelector(state => state.chatState.userId);
  const userName = useSelector(state => state.chatState.userName);
  const { modal, channelEditId } = props;


  const handleSubscription = (chatData, path, func) => async (e) => {
    e.preventDefault()
    try {
      const {data: { attributes}} = await axios.post(path, chatData)
      dispatch(func({ channel: attributes.chat }))
    } catch (e) {
      console.log(e)
      throw new Error('Something went wrong');
    }
    dispatch(actions.modalStateClose());
  };

  const closeModal = () => {
    dispatch(actions.modalStateClose());
  };


  return (
    <Modal show={modal !== 'close'} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <section className="vh-25" >
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div >

                <div className="card" style={{'borderRadius': "15px"}}>
                    <div className="card-body text-center">
                    <div className="mt-3 mb-4">
                        <label  htmlFor="my_file">
                            <Image roundedCircle  src="https://chat-mongo.storage.yandexcloud.net/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg"
                            className="img-fluid" style={{"width": "100px"}} />
                            <input type="file" id="my_file"  style={{"display": "none"}}/>
                        </label>
                    </div>
                    <h4 className="mb-2">{t("logUser")} {userName}</h4>
                    </div>
                </div>

                </div>
            </div>
        </div>
    </section>
      </Modal.Body>
    </Modal>
  );
};

export default Profile;