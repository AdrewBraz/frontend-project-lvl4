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
    switchChannel(state, { payload: { id } }) {
      state.currentChannelId = id;
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
  modalStateAdd,
  switchChannel,
} = chatSlice.actions;

export default chatSlice.reducer;
