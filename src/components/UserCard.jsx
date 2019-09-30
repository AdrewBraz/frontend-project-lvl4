import React, { useContext } from 'react';
import User from '../context';

function UserCard() {
  return (
    <div>
      <span>{useContext(User).name}</span>
    </div>
  );
}

export default UserCard;
