import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const fetchMessagesRequest = createAction('FETCH_MESSAGES_REQUEST');
export const fetchMessagesFailure = createAction('FETCH_MESSAGES_FAILURE');
export const fetchMessagesSuccess = createAction('FETCH_MESSAGES_SUCCESS');

export const removeMessageRequest = createAction('MESSAGE_REMOVE_REQUEST');
export const removeMessageSuccess = createAction('MESSAGE_REMOVE_SUCCESS');
export const removeMessageFailure = createAction('MESSAGE_REMOVE_FAILURE');

export const socketConnected = createAction('SOCKET_CONNECTED');
export const socketDisconnected = createAction('SOCKET_DISCONNECTED');


export const addMessageSuccess = createAction('ADD_MESSAGE_SUCCESS');
export const addChannelSuccess = createAction('ADD_CHANNEL_SUCCESS');

export const switchChannel = createAction('SWITCH_CHANNEL');


export const addMessage = (id, message) => async () => {
  const data = { attributes: message };
  await axios.post(routes.channelMessagesPath(id), { data });
};

export const addChannel = name => async () => {
  const data = { attributes: name };
  await axios.post(routes.channelsPath(), { data });
};

export const fetchMessages = id => async (dispatch) => {
  dispatch(fetchMessagesRequest());
  try {
    const { data } = await axios.get(routes.channelMessagesPath(id));
    dispatch(fetchMessagesSuccess({ id, messages: data.map(channel => channel.attributes) }));
  } catch (e) {
    dispatch(fetchMessagesFailure());
    throw e;
  }
};

// export const removeMessage = message => async (dispatch) => {
//   dispatch(removeMessageRequest());
//   try {
//     const url = routes.messageUrl(message.id);
//     await axios.delete(url);
//     dispatch(removeMessageSuccess({ id: message.id }));
//   } catch (e) {
//     dispatch(removeMessageFailure());
//     throw e;
//   }
// };
