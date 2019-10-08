import React from 'react';
import UserCard from './UserCard';
import ChannelsList from './ChannelsList';
import NewChannelForm from './NewChannelForm';

function SideBar() {
  return (
    <div className="h-100 d-flex flex-column col-4">
      <UserCard />
      <ChannelsList />
      <NewChannelForm />
    </div>
  );
}

export default SideBar;
