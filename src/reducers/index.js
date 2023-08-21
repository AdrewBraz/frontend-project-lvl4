/* eslint-disable no-param-reassign */
// @ts-check

import { combineReducers } from '@reduxjs/toolkit';

import channels from './channelsSlice';
import messages from './messagesSlice';
import chatState from './chatSlice';
import connectionState from './connectionSlice';
import allChats from './allChatsSlice';

export default combineReducers({
  connectionState,
  messages,
  channels,
  chatState,
  allChats
});
