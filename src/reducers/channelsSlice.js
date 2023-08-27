/* eslint-disable no-param-reassign */
// @ts-check

import { createSlice } from '@reduxjs/toolkit';
import { loginUser, modalStateClose } from './chatSlice';



const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannelToStore(state, { payload: { channel } }) {
      state.push(channel);
    },
    renameChannel(state, { payload: { renamedChannel } }) {
      const { id } = renamedChannel;
      const renameChannelId = state.findIndex((i) => i.id === id);
      state[renameChannelId] = renamedChannel;
    },
    removeChannel(state, { payload: { channel }}) {
      return state.filter((ch) => ch.id !== channel.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser, (state, action) => {
      state = action.payload.chatList
      return state
    })
  }
});

export const {
  addChannelToStore, renameChannel, removeChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
