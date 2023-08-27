/* eslint-disable no-param-reassign */
// @ts-check
import { createSlice } from '@reduxjs/toolkit';

import { removeChannel } from './channelsSlice';

const chatSlice = createSlice({
  name: 'chatState',
  initialState: {},
  reducers: {
    modalStateAdd(state) {
      state.modal = 'adding';
    },
    modalStateSubscribe(state) {
      state.modal = 'subscribing';
    },
    modalStateEdit(state, { payload }) {
      state.channelEditId = payload.id;
      state.modal = 'renaming';
    },
    modalStateClose(state) {
      state.channelEditId = null;
      state.modal = 'closed';
    },
    modalStateDelete(state) {
      state.modal = 'removing';
    },
    switchChat(state, { payload: { chat } }) {
      state.currentChannelId = chat.id;
    },
    loginUser(state, { payload: { chat, user, refreshToken, accessToken } }) {
      state.currentChannelId = chat.id
      state.isAuth = !!accessToken,
      state.userName = user.userName
      state.userId = user.id
    },
    checkAuth(state, { payload: { accessToken } }) {
      state.isAuth = !!accessToken
    },
  },
  extraReducers: {
    [removeChannel](state) {
      state.currentChannelId = 1;
    },
  },
});

export const {
  modalStateClose,
  modalStateDelete,
  modalStateEdit,
  modalStateSubscribe,
  modalStateAdd,
  switchChat,
  loginUser,
  checkAuth
} = chatSlice.actions;

export default chatSlice.reducer;
