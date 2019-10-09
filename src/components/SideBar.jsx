import React from 'react';
import UserCard from './UserCard';
import ChannelList from './ChannelList';
import NewChannelForm from './NewChannelForm';

function SideBar() {
  return (
    <div className="h-100 d-flex flex-column col-4">
      <UserCard />
      <ChannelList />
      <NewChannelForm />
    </div>
  );
}

export default SideBar;
