// @ts-check
import { createSlice } from '@reduxjs/toolkit';

import { renameChannelSuccess } from './channelsRenamingSlice';
import { removeChannelSuccess } from './channelsRemovingSlice';

const chatSlice = createSlice({
  name: 'chatState',
  initialState: {},
  reducers: {
    switchChannel(state, { payload: { id } }) {
      state.currentChannelId = id;
    },
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
  },
  extraReducers: {
    [renameChannelSuccess](state) {
      state.channelEditId = null;
    },
    [removeChannelSuccess](state, { payload: { id } }) {
      const { currentChannelId } = state;
      const defaultChannelId = 1;
      state.channelEditId = null;
      state.currentChannelId = id === currentChannelId ? defaultChannelId : currentChannelId;
    },
  },
});

export const {
  switchChannel,
  modalStateClose,
  modalStateDelete,
  modalStateEdit,
} = chatSlice.actions;

export default chatSlice.reducer;
