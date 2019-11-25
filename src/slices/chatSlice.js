// @ts-check
import { createSlice } from '@reduxjs/toolkit';
import { removeChannelSuccess } from './channelsRemovingSlice';
import { renameChannelSuccess } from './channelsRenamingSlice';

const chatSlice = createSlice({
  name: 'chatState',
  initialState: {},
  reducers: {
    switchChannel(state, { payload: { id } }) {
      return { ...state, currentChannelId: id };
    },
    modalStateEdit(state, { payload }) {
      return { ...state, channelEditId: payload.id, modal: 'edit' };
    },
    modalStateClose(state) {
      return { ...state, channelEditId: null, modal: 'close' };
    },
    modalStateDelete(state) {
      return { ...state, modal: 'delete' };
    },
    extraReducers: {
      [renameChannelSuccess](state) {
        return {
          ...state,
          channelEditId: null,
        };
      },
      [removeChannelSuccess](state, { payload: { id } }) {
        const { currentChannelId } = state;
        const defaultChannelId = 1;
        return {
          ...state,
          channelEditId: null,
          currentChannelId: id === currentChannelId ? defaultChannelId : currentChannelId,
        };
      },
    },
  },
});

export const {
  switchChannel, modalStateClose, modalStateDelete, modalStateEdit,
} = chatSlice.actions;

export default chatSlice.reducer;
