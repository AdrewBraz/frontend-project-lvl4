import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const fetchMessagesRequest = createAction('FETCH_MESSAGES_REQUEST');
export const fetchMessagesFailure = createAction('FETCH_MESSAGES_FAILURE');
export const fetchMessagesSuccess = createAction('FETCH_MESSAGES_SUCCESS');

export const addMessageSuccess = createAction('ADD_MESSAGE_SUCCESS');


export const fetchMessages = () => async (dispatch) => {
  dispatch(fetchMessagesRequest());
  try {
    const url = routes.tasksUrl();
    const response = await axios.get(url);
    dispatch(fetchMessagesSuccess({ message: response.data }));
  } catch (e) {
    dispatch(fetchMessagesFailure());
    throw e;
  }
};
