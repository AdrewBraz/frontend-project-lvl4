import React from 'react';

import MessagesList from './MessagesList';
import NewMessageForm from './NewMessageForm';

function Messages() {
  return (
    <>
      <MessagesList />
      <NewMessageForm />
    </>
  );
}

export default Messages;
