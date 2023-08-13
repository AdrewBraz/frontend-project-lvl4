/* eslint-disable no-param-reassign */
// @ts-check

import { createSlice } from '@reduxjs/toolkit';
import { createUser, modalStateClose } from './chatSlice';



const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannelToStore(state, { payload: { newChannel } }) {
      state.push(newChannel);
    },
    renameChannel(state, { payload: { renamedChannel } }) {
      const { id } = renamedChannel;
      const renameChannelId = state.findIndex((i) => i.id === id);
      state[renameChannelId] = renamedChannel;
    },
    removeChannel(state, { payload: { id } }) {
      console.log(id)
      return state.filter((ch) => ch.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser, (state, action) => {
      console.log(action.payload.chatList, state)
      state = action.payload.chatList
      return state
    })
  }
});

export const {
  addChannelToStore, renameChannel, removeChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
