/* eslint-disable no-param-reassign */
// @ts-check
import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export const {
  modalStateClose,
  modalStateDelete,
  modalStateEdit,
} = chatSlice.actions;

export default chatSlice.reducer;
