/* eslint-disable no-param-reassign */
// @ts-check

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { fetchMessagesSuccess, fetchMessagesRequest, fetchMessagesFailure } from './messagesFetchingSlice';
import { removeChannel } from './channelsSlice';
import routes from '../routes';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, { payload: { newMessage } }) {
      const { channelId } = newMessage;
      const channel = state[channelId];
      channel.push(newMessage);
    },
  },
  extraReducers: {
    [fetchMessagesSuccess](state, { payload: { id, channelMessages } }) {
      state[id] = channelMessages;
    },
    [removeChannel](state, { payload: { id } }) {
      delete state[id];
    },
  },
});

export const fetchMessages = id => async (dispatch) => {
  dispatch(fetchMessagesRequest());
  try {
    const { data: { data } } = await axios.get(routes.channelMessagesPath(id));
    dispatch(fetchMessagesSuccess({ id, channelMessages: data.map(ch => ch.attributes) }));
  } catch (e) {
    dispatch(fetchMessagesFailure());
    throw e;
  }
};

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
