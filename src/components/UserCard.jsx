import React, { useContext } from 'react';
import User from '../context';

function UserCard() {
  return (
    <div className="mb-5">
      <span>{useContext(User).name}</span>
    </div>
  );
}

export default UserCard;
