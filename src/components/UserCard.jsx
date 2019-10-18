import React, { useContext } from 'react';
import User from '../context';

function UserCard() {
  return (
    <div className="mb-5 p-3 border border-info">
      You are logged in as  <span><strong>{useContext(User).name}</strong></span>
    </div>
  );
}

export default UserCard;
