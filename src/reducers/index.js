/* eslint-disable no-param-reassign */
// @ts-check

import { combineReducers } from '@reduxjs/toolkit';
import { i18nReducer } from 'react-redux-i18n';
import { reducer as formReducer } from 'redux-form';

import appState from './appSlice';
import channelsAddingState from './channelsAddingSlice';
import channelsRemovingState from './channelsRemovingSlice';
import channelsRenamingState from './channelsRenamingSlice';
import channels from './channelsSlice';
import messagesAddingState from './messagesAddingSlice';
import messagesFetchingState from './messagesFetchingSlice';
import messages from './messagesSlice';
import chatState from './chatSlice';
import connectionState from './connectionSlice';

export default combineReducers({
  appState,
  connectionState,
  channelsAddingState,
  channelsRemovingState,
  channelsRenamingState,
  messagesFetchingState,
  messagesAddingState,
  messages,
  channels,
  chatState,
  form: formReducer,
  i18n: i18nReducer,
});
