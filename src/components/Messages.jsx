import React from 'react';


import MessagesList from './MessagesList';
import NewMessageForm from './NewMessageForm';

function Messages() {
  return (
    <div className="d-flex overflow-auto flex-column h-100 col-8">
      <MessagesList />
      <NewMessageForm />
    </div>
  );
}

export default Messages;
