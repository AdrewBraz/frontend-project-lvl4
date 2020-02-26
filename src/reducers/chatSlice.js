/* eslint-disable no-param-reassign */
// @ts-check
import { createSlice } from '@reduxjs/toolkit';

import { removeChannel } from './channelsSlice';

const chatSlice = createSlice({
  name: 'chatState',
  initialState: {},
  reducers: {
    modalStateEdit(state, { payload }) {
      state.channelEditId = payload.id;
      state.modal = 'edit';
    },
    modalStateClose(state) {
      state.channelEditId = null;
      state.modal = 'close';
    },
    modalStateDelete(state) {
      state.modal = 'delete';
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
  switchChannel,
} = chatSlice.actions;

export default chatSlice.reducer;
