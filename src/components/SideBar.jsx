import React from 'react';
import UserCard from './UserCard';
import ChannelsList from './ChannelsList';
import NewChannelForm from './NewChannelForm';

function SideBar() {
  return (
    <>
      <UserCard />
      <ChannelsList />
      <NewChannelForm />
    </>
  );
}

export default SideBar;
