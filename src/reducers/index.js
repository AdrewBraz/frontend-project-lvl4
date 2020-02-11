/* eslint-disable no-param-reassign */
// @ts-check

import { combineReducers } from '@reduxjs/toolkit';
import { i18nReducer } from 'react-redux-i18n';


import channels from './channelsSlice';
import messages from './messagesSlice';
import chatState from './chatSlice';
import connectionState from './connectionSlice';

export default combineReducers({
  connectionState,
  messages,
  channels,
  chatState,
  i18n: i18nReducer,
});
