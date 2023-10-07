// @ts-check
import React, { useEffect, useState, useRef } from 'react';
import { ListGroup, ListGroupItem, Col, Image } from 'react-bootstrap';
import { format } from 'date-fns'
import { Translation } from 'react-i18next';
import { useSelector } from 'react-redux';

import NewMessageForm from './NewMessageForm';

const Messages = () => {
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState('')

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

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true)
  }
  
  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false)
  }

  const dropHandler = (e) => {
    e.preventDefault()
    setFile(e.dataTransfer.files[0])
    setDrag(false)
  }



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
            <div >
              <Image className='mr-1' roundedCircle src={message.userAvi} width={40} height={40} />
              <span className="text-muted small text-nowrap mt-2">{format(new Date(message.timestamp), 'MMMM dd HH:MM:ss')}</span>
            </div>
            <div className='flex-shrink-1 bg-light rounded py-2 px-3 mr-3'>
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
      {!drag ? 
      <div style={{ height: '70vh' }} 
        className="border border-dark rounded overflow-auto mt-auto mb-3"
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragOver={(e) => dragStartHandler(e)}
      >
        {renderMessages()}
        <span ref={lastMessageRef} />
      </div> :
      <div style={{ height: '70vh' }} 
          className="border border-dark opacity-75 text-align-center"
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={(e) => {dropHandler(e)}}
        > Перетащите файл сюда</div>
      }
      <NewMessageForm setFile={setFile} file={file} modal={modal} currentChannelId={currentChannelId} />
    </Col>
  );
};

export default Messages;
