// @ts-check
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux/es/exports';
import { useTranslation } from 'react-i18next';

import actions from '../actions';


function UserCard() {
  const userName = useSelector(state => state.chatState.userName);
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(actions.modalStateSubscribe());
  };
  return (
    <div className="shadow p-3 mb-5 bg-white rounded">
      {t('logUser')}
      <span><strong>{` ${userName}`}</strong></span>
      <Button onClick={handleClick}>All Chats</Button>
    </div>
  );
}

export default UserCard;
