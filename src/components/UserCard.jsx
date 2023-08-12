// @ts-check
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux/es/exports';
import { useTranslation } from 'react-i18next';

import User from '../context';

function UserCard() {
  const userName = useSelector(state => state.chatState.userName);
  const { t } = useTranslation();
  return (
    <div className="shadow p-3 mb-5 bg-white rounded">
      {t('logUser')}
      <span><strong>{` ${userName}`}</strong></span>
    </div>
  );
}

export default UserCard;
