// @ts-check
import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { Modal, Spinner, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import cn from 'classnames';


import routes from '../../routes';
import actions from '../../actions';


const AllChats = (props) => {
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) => state.chatState.currentChannelId);

  const chats = [];
  const { modal } = props;

  const renderChannels = () => (chats.map((channel) => {
    const isActive = channel.id === currentChannel;
    const classList = cn({
      active: isActive,
      'list-group-item-action list-group-item': true,
    });
    console.log(channel)
    return (
      <a className={classList} href={`#${channel.id}`} key={channel.id}>
        {channel.groupName}
      </a>
    )
  }))

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(routes.chats())
      data.forEach(item => chats.push(item))
      return data
    }
    fetch()
    renderChannels()    
  }, chats)

  const generateOnSubmit = () => async (values) => {
    const { name } = values;
    try {
      const data = { attributes: { groupName: name, userId, removable: true } };
      await axios.post(routes.channelsPath(), { data });
    } catch (e) {
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
        <div className="mb-3">
        <ul className="list-group">
          {renderChannels()}
        </ul>
      </div>
      </Modal.Body>
    </Modal>
  );
};

export default AllChats;
