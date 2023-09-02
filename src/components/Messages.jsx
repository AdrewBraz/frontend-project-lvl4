// @ts-check
import React, { useEffect, useRef } from 'react';
import { ListGroup, ListGroupItem, Col, Image } from 'react-bootstrap';
import { Translation } from 'react-i18next';
import { useSelector } from 'react-redux';

import NewMessageForm from './NewMessageForm';

const Messages = () => {
  const {currentChannelId, modal} = useSelector((state) => state.chatState);
  const messageList = useSelector((state) => {
    const messages = state.messages.filter((i) => i.groupId === currentChannelId);
    return messages;
  });

  const lastMessageRef = useRef(null);
  useEffect(() => {
    lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
  });



  const renderMessages = () => {
    if (!messageList || messageList.length < 1) {
      return (
        <div className="d-flex flex-column align-items-center justify-content-center h-100">
          <strong className="display-2">
            <Translation>
              {(t) => t('messages')}
            </Translation>
          </strong>
        </div>
      );
    }
    return (
      <ListGroup>
        {messageList.map((message) => (
          <ListGroupItem className="d-flex flex-column" key={message._id}>
            <div className="d-flex justify-content-between">
              <strong>{message.author.userName}</strong>
              <span className="font-weight-light">{message.timestamp}</span>
            </div>
            <div>
            {message.url ? 
              <Col><Image style={{maxHeight: "40vh"}} className='img-fluid' src={message.url} rounded/></Col> : 
              null}
              <p>{message.text}</p>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  };

  return (
    <Col xs={12} md={8} lg={9}>
      <div style={{ height: '70vh' }} className="border border-dark rounded overflow-auto mt-auto mb-3">
        {renderMessages()}
        <span ref={lastMessageRef} />
      </div>
      <NewMessageForm modal={modal} currentChannelId={currentChannelId} />
    </Col>
  );
};

export default Messages;
