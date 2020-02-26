/* eslint-disable no-param-reassign */
// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {},
  reducers: {
    addChannelToStore(state, { payload: { newChannel } }) {
      state.push(newChannel);
    },
    renameChannel(state, { payload: { renamedChannel } }) {
      const { id } = renamedChannel;
      const renameChannelId = state.findIndex(ch => ch.id === id);
      state[renameChannelId] = renamedChannel;
    },
    removeChannel(state, { payload: { id } }) {
      return state.filter(ch => ch.id !== id);
    },
  },
});

export const {
  addChannelToStore, renameChannel, removeChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
