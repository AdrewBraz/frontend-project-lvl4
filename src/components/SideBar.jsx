// @ts-check
import React from 'react';
import { Col } from 'react-bootstrap';

import UserCard from './UserCard';
import ChannelList from './ChannelList';
import NewChannelForm from './NewChannelForm';

function SideBar() {
  return (
    <Col className="mb-3" xs={12} md={4} lg={3}>
      <UserCard />
      <ChannelList />
      <NewChannelForm />
    </Col>
  );
}

export default SideBar;
