// @ts-check

import axios from 'axios';
import routes from '../routes';

import { addChannelFailure, addChannelRequest, addChannelSuccess } from '../slices/channelsAddingSlice';
import { removeChannelFailure, removeChannelRequest, removeChannelSuccess } from '../slices/channelsRemovingSlice';
import { renameChannelFailure, renameChannelRequest, renameChannelSuccess } from '../slices/channelsRenamingSlice';
import {
  switchChannel, modalStateClose, modalStateDelete, modalStateEdit,
} from '../slices/chatSlice';
import { socketConnected, socketDisconnected } from '../slices/connectionSlice';
import { addMessageFailure, addMessageRequest, addMessageSuccess } from '../slices/messagesAddingSlice';
import { fetchMessagesFailure, fetchMessagesRequest, fetchMessagesSuccess } from '../slices/messagesFetchingSlice';

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

export const addChannel = name => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    const data = { attributes: name };
    await axios.post(routes.channelsPath(), { data });
  } catch (e) {
    dispatch(addChannelFailure());
    throw e;
  }
};

export const renameChannel = (id, name) => async (dispatch) => {
  dispatch(renameChannelRequest());
  try {
    const data = { attributes: name };
    await axios.patch(routes.channelPath(id), { data });
  } catch (e) {
    dispatch(renameChannelFailure());
    throw e;
  }
};

export const removeChannel = id => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    await axios.delete(routes.channelPath(id));
    dispatch(removeChannelSuccess({ id }));
  } catch (e) {
    dispatch(removeChannelFailure());
    throw e;
  }
};

export const fetchMessages = id => async (dispatch) => {
  dispatch(fetchMessagesRequest());
  try {
    const { data } = await axios.get(routes.channelMessagesPath(id));
    dispatch(fetchMessagesSuccess({ id, channelMessages: data.map(ch => ch.attributes) }));
  } catch (e) {
    dispatch(fetchMessagesFailure());
    throw e;
  }
};

export {
  addChannelFailure, addChannelRequest, addChannelSuccess,
  removeChannelFailure, removeChannelRequest, removeChannelSuccess,
  renameChannelFailure, renameChannelRequest, renameChannelSuccess,
  switchChannel, modalStateClose, modalStateDelete, modalStateEdit,
  socketConnected, socketDisconnected,
  addMessageFailure, addMessageRequest, addMessageSuccess,
  fetchMessagesFailure, fetchMessagesRequest, fetchMessagesSuccess,
};
