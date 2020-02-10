/* eslint-disable no-param-reassign */
// @ts-check
import { createSlice } from '@reduxjs/toolkit';

import { removeChannel } from './channelsSlice';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    fetchMessages(state, { payload: { messages } }) {
      state = messages;
      return state;
    },
    addMessage(state, { payload: { newMessage } }) {
      state.push(newMessage);
    },
  },
  extraReducers: {
    [removeChannel](state, { payload: { id } }) {
      state.filter(ch => ch.channelId !== id);
    },
  },
});

export const { addMessage, fetchMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
