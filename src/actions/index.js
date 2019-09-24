import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const fetchMessagesRequest = createAction('FETCH_MESSAGES_REQUEST');
export const fetchMessagesFailure = createAction('FETCH_MESSAGES_FAILURE');
export const fetchMessagesSuccess = createAction('FETCH_MESSAGES_SUCCESS');

export const removeMessageRequest = createAction('MESSAGE_REMOVE_REQUEST');
export const removeMessageSuccess = createAction('MESSAGE_REMOVE_SUCCESS');
export const removeMessageFailure = createAction('MESSAGE_REMOVE_FAILURE');

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

export const removeMessage = task => async (dispatch) => {
    dispatch(removeMessageRequest());
    try {
      const url = routes.taskUrl(task.id);
      await axios.delete(url);
      dispatch(removeMessageSuccess({ id: task.id }));
    } catch (e) {
      dispatch(removeMessageFailure());
      throw e;
    }
  };