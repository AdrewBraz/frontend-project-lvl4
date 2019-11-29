// @ts-check
import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {},
  reducers: {
  fetchMessagesSuccess(state, { payload: { id, channelMessages } }) {
      return { ...state, [id]: channelMessages };
    },
  addMessageSuccess(state, { payload: { newMessage } }) {
      const { channelId } = newMessage;
      const messageList = state[channelId] ? [...state[channelId], newMessage] : [newMessage];
      return { ...state, [channelId]: messageList };
    },
  }
});

export default messagesSlice.reducer;
