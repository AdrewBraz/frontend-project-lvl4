/* eslint-disable no-param-reassign */
// @ts-check
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { addMessageFailure, addMessageRequest, addMessageSuccess } from './messagesAddingSlice';
import { fetchMessagesSuccess, fetchMessagesRequest, fetchMessagesFailure } from './messagesFetchingSlice';
import routes from '../routes';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {},
  reducers: {},
  extraReducers: {
    [fetchMessagesSuccess](state, { payload: { id, channelMessages } }) {
      state[id] = channelMessages;
    },
    [addMessageSuccess](state, { payload: { newMessage } }) {
      const { channelId } = newMessage;
      const messageList = state[channelId] ? [...state[channelId], newMessage] : [newMessage];
      state[channelId] = messageList;
    },
  },
});

export const fetchMessages = id => async (dispatch) => {
  dispatch(fetchMessagesRequest());
  try {
    const { data } = await axios.get(routes.channelMessagesPath(id));
    console.log(data, id)
    dispatch(fetchMessagesSuccess({ id, channelMessages: data.map(ch => ch.attributes) }));
  } catch (e) {
    dispatch(fetchMessagesFailure());
    throw e;
  }
};

export const addMessage = (id, message) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const data = { attributes: message };
    await axios.post(routes.channelMessagesPath(id), { data });
  } catch (e) {
    dispatch(addMessageFailure());
    throw e;
  }
};

export { addMessageSuccess };
export default messagesSlice.reducer;
