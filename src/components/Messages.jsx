// @ts-check

import React from 'react';
import { Col } from 'react-bootstrap';

import MessagesList from './MessagesList';
import NewMessageForm from './NewMessageForm';

function Messages() {
  return (
    <Col sm={8} lg={9}>
      <MessagesList />
      <NewMessageForm />
    </Col>
  );
}

export default Messages;
