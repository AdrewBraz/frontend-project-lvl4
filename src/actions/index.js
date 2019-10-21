import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const fetchMessagesRequest = createAction('FETCH_MESSAGES_REQUEST');
export const fetchMessagesFailure = createAction('FETCH_MESSAGES_FAILURE');
export const fetchMessagesSuccess = createAction('FETCH_MESSAGES_SUCCESS');

export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const socketConnected = createAction('SOCKET_CONNECTED');
export const socketDisconnected = createAction('SOCKET_DISCONNECTED');

export const modalStateClose = createAction('MODAL_STATE_CLOSE');
export const modalStateEdit = createAction('MODAL_STATE_EDIT');
export const modalStateDelete = createAction('MODAL_STATE_DELETE');

export const addMessageRequest = createAction('ADD_MESSAGE_REQUEST');
export const addMessageSuccess = createAction('ADD_MESSAGE_SUCCESS');
export const addMessageFailure = createAction('ADD_MESSAGE_FAILURE');

export const addChannelRequest = createAction('ADD_CHANNEL_REQUEST');
export const addChannelSuccess = createAction('ADD_CHANNEL_SUCCESS');
export const addChannelFailure = createAction('ADD_CHANNEL_FAILURE');

export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');

export const switchChannel = createAction('SWITCH_CHANNEL');


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
