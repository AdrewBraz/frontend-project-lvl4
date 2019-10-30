// @ts-check
import React, { useContext } from 'react';
import User from '../context';

function UserCard() {
  const { userName } = useContext(User);
  return (
    <div className="shadow p-3 mb-5 bg-white rounded">
      You are logged in as
      <span><strong>{` ${userName}`}</strong></span>
    </div>
  );
}

export default UserCard;
