/* eslint-disable no-param-reassign */
// @ts-check
import { createSlice } from '@reduxjs/toolkit';

import { removeChannel } from './channelsSlice';
import { createUser } from './chatSlice'

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
    [createUser](state, { payload: { messageList } }) { 
      console.log(messageList)
      state = messageList
      return state
    },
  },
});

export const { addMessage, fetchMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
