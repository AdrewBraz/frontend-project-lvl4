// @ts-check
import React, { useEffect, useState, useRef } from 'react';
import { ListGroup, ListGroupItem, Col, Image } from 'react-bootstrap';
import { format } from 'date-fns'
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
    if( lastMessageRef.current ){
    lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
      <ListGroup className='list-unstyled'>
        {messageList.map((message) => (
          <ListGroupItem className="d-flex mb-4" key={message._id}>
              <Image className='d-flex align-self-start me-3 shadow-1-strong' roundedCircle src={message.userAvi} width={50} height={50} />
              <div className="card w-100">
                <div className="card-header d-flex justify-content-between p-3">
                  <p className="fw-bold mb-0">{message.author.userName}</p>
                  <p className="text-muted small mb-0"><i className="far fa-clock"></i> {format(new Date(message.timestamp), 'dd/MM/yyyy HH:mm:ss')}</p>
                </div>
              <div className="card-body">
                {message.url ? 
                <Col><Image style={{maxHeight: "40vh"}} className='img-fluid' src={message.url} rounded/></Col> : 
                null}
                <p className="mb-0">
                  {message.text}
                </p>
              </div>
              </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  };

  return (
    <Col xs={12} md={8} lg={9}>
      <div style={{ height: '70vh' }} 
        className="border border-dark rounded overflow-auto mt-auto mb-3"
      >
        {renderMessages()}
        <span ref={lastMessageRef} />
      </div> 
      <NewMessageForm modal={modal} currentChannelId={currentChannelId} />
    </Col>
  );
};

export default Messages;
