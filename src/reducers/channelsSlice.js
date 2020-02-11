/* eslint-disable no-param-reassign */
// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {},
  reducers: {
    addChannelToStore(state, { payload: { newChannel } }) {
      console.log(newChannel)
      const { ByIds, allIds } = state;
      ByIds.push(newChannel);
      allIds.push(newChannel.id);
    },
    switchChannel(state, { payload: { id } }) {
      state.currentChannelId = id;
    },
    renameChannel(state, { payload: { renamedChannel } }) {
      const { id } = renamedChannel;
      const { ByIds } = state;
      const renameChannelId = ByIds.findIndex(ch => ch.id === id);
      ByIds[renameChannelId] = renamedChannel;
    },
    removeChannel(state, { payload: { id } }) {
      console.log(id)
      const { ByIds, allIds } = state;
      return {
        currentChannelId: 1,
        ByIds: ByIds.filter(ch => ch.id !== id),
        allIds: allIds.filter(ch => ch !== id),
      };
    },
  },
});

export const {
  switchChannel, addChannelToStore, renameChannel, removeChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
