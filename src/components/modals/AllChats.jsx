// @ts-check
import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { Modal, Spinner, Alert, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import cn from 'classnames';


import routes from '../../routes';
import actions from '../../actions';


const AllChats = (props) => {
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) => state.chatState.currentChannelId);
  const allChats = useSelector((state) => state.allChats);
  const { modal } = props;

  const subscribe = (id) => async (e) => {
    e.preventDefault()
    try {
      console.log(id)
    } catch (e) {
      throw new Error('Something went wrong');
    }
    dispatch(actions.modalStateClose());
  };

  const renderChannels = () => (allChats.map((channel) => {
    const isActive = channel.id === currentChannel;
    const classList = cn({
      active: isActive,
      'list-group-item-action list-group-item': true,
    });
    console.log(channel)
    return (
      <a className={classList} href={`#${channel._id}`} key={channel._id} onClick={subscribe(channel._id)}>
        {channel.groupName}
        <Badge bg="primary">Participants {channel.participants.length}</Badge>
      </a>
    )
  }))

  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get(routes.chats())
    }
    fetch()
    renderChannels()    
  }, [])

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
