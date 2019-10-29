import React, { useContext } from 'react';
import User from '../context';

function UserCard() {
  return (
    <div className="shadow p-3 mb-5 bg-white rounded">
      You are logged in as
      <span><strong>{` ${useContext(User).userName}`}</strong></span>
    </div>
  );
}

export default UserCard;
