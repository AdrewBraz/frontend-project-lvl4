// @ts-check
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import User from '../context';

function UserCard() {
  const userName = useContext(User);
  const { t } = useTranslation();
  return (
    <div className="shadow p-3 mb-5 bg-white rounded">
      {t('logUser')}
      <span><strong>{` ${userName}`}</strong></span>
    </div>
  );
}

export default UserCard;
