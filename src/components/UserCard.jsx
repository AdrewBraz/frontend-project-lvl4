// @ts-check
import React, { useContext } from 'react';
import { Translate } from 'react-redux-i18n';
import User from '../context';

function UserCard() {
  const { userName } = useContext(User);
  return (
    <div className="shadow p-3 mb-5 bg-white rounded">
      <Translate value="application.logUser" />
      <span><strong>{` ${userName}`}</strong></span>
    </div>
  );
}

export default UserCard;
