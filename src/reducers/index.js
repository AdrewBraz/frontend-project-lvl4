/* eslint-disable no-param-reassign */
// @ts-check

import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { i18nReducer } from 'react-redux-i18n';
import { omitBy, without } from 'lodash';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';


const messagesFetchingState = createReducer(null, {
  [actions.fetchMessagesRequest]() {
    return 'requested';
  },
  [actions.fetchMessagesFailure]() {
    return 'failed';
  },
  [actions.fetchMessagesSuccess]() {
    return 'finished';
  },
});

const channelsAddingState = createReducer(null, {
  [actions.addChannelRequest]() {
    return 'requested';
  },
  [actions.addChannelFailure]() {
    return 'failed';
  },
  [actions.addChannelSuccess]() {
    return 'finished';
  },
});

const channelsRemovingState = createReducer(null, {
  [actions.removeChannelRequest]() {
    return 'requested';
  },
  [actions.removeChannelFailure]() {
    return 'failed';
  },
  [actions.removeChannelSuccess]() {
    return 'finished';
  },
});

const channelsRenamingState = createReducer(null, {
  [actions.renameChannelRequest]() {
    return 'requested';
  },
  [actions.renameChannelFailure]() {
    return 'failed';
  },
  [actions.renameChannelSuccess]() {
    return 'finished';
  },
});

const messagesAddingState = createReducer(null, {
  [actions.addMessageRequest]() {
    return 'requested';
  },
  [actions.addMessageFailure]() {
    return 'failed';
  },
  [actions.addMessageSuccess]() {
    return 'finished';
  },
});

const connectionState = createReducer(null, {
  [actions.socketConnected]() {
    return 'connected';
  },
  [actions.socketDisconnected]() {
    return 'disconnected';
  },
});

const messages = createReducer({}, {
  [actions.fetchMessagesSuccess](state, { payload: { id, channelMessages } }) {
    state[id] = channelMessages;
  },
  [actions.addMessageSuccess](state, { payload: { newMessage } }) {
    const { channelId } = newMessage;
    const messageList = state[channelId] ? [...state[channelId], newMessage] : [newMessage];
    state[channelId] = messageList;
  },
});

const channels = createReducer({}, {
  [actions.addChannelSuccess](state, { payload: { newChannel } }) {
    const { ByIds, allIds } = state;
    ByIds[newChannel.id] = newChannel;
    allIds.push(newChannel.id);
  },
  [actions.renameChannelSuccess](state, { payload: { renamedChannel } }) {
    const { id } = renamedChannel;
    const { ByIds } = state;
    ByIds[id] = renamedChannel;
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    const { ByIds, allIds } = state;
    return {
      ByIds: omitBy(ByIds, ch => ch.id === id),
      allIds: without(allIds, id),
    };
  },
});

const chatState = createReducer({}, {
  [actions.switchChannel](state, { payload: { id } }) {
    state.currentChannelId = id;
  },
  [actions.modalStateEdit](state, { payload }) {
    state.channelEditId = payload.id;
    state.modal = 'edit';
  },
  [actions.modalStateClose](state) {
    state.channelEditId = null;
    state.modal = 'close';
  },
  [actions.modalStateDelete](state) {
    state.modal = 'delete';
  },
  [actions.renameChannelSuccess](state) {
    state.channelEditId = null;
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    const { currentChannelId } = state;
    const defaultChannelId = 1;
    state.channelEditId = null;
    state.currentChannelId = id === currentChannelId ? defaultChannelId : currentChannelId;
  },
});

const appState = createReducer('finished', {
  [actions.socketDisconnected]() { return 'processing'; },
  [actions.addChannelRequest]() { return 'processing'; },
  [actions.addMessageRequest]() { return 'processing'; },
  [actions.renameChannelRequest]() { return 'processing'; },
  [actions.removeChannelRequest]() { return 'processing'; },
  [actions.socketConnected]() { return 'finished'; },
  [actions.addChannelSuccess]() { return 'finished'; },
  [actions.addMessageSuccess]() { return 'finished'; },
  [actions.removeChannelSuccess]() { return 'finished'; },
  [actions.renameChannelSuccess]() { return 'finished'; },
});

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
