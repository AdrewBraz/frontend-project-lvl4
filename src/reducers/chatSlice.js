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
    createUser(state, { payload: { chat, user, refreshToken } }) {
      state.currentChannelId = chat.id
      state.token = true,
      state.userName = user.userName
      state.userId = user.id
    },
    loginUser(state, { payload: { chat, user, refreshToken } }) {
      state.currentChannelId = chat.id
      state.isAuth = true,
      state.userName = user.userName
      state.userId = user.id
    }
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
  modalStateAdd,
  switchChat,
  createUser,
  loginUser
} = chatSlice.actions;

export default chatSlice.reducer;
