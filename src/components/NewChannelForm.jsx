// @ts-check
import React from 'react';
import { Button } from 'react-bootstrap';
import { Translation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import actions from '../actions';

const NewChannelForm = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(actions.modalStateAdd());
  };
  return (
    <div>
      <Button className="d-block w-100" variant="info" onClick={handleClick}>
        <Translation>
          {(t) => t('addChannel')}
        </Translation>
      </Button>
    </div>
  );
};

export default NewChannelForm;
