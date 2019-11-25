// @ts-check
import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';
import { reducer as formReducer } from 'redux-form';
import channels from '../slices/channelsSlice';
import channelsAddingState from '../slices/channelsAddingSlice';
import channelsRemovingState from '../slices/channelsRemovingSlice';
import channelsRenamingState from '../slices/channelsRenamingSlice';
import chatState from '../slices/chatSlice';
import messages from '../slices/messagesSlice';
import messagesAddingState from '../slices/messagesAddingSlice';
import messagesFetchingState from '../slices/messagesFetchingSlice';
import connectionState from '../slices/connectionSlice';
import appState from '../slices/appSlice';

export default combineReducers({
  appState,
  connectionState,
  channelsAddingState,
  channelsRemovingState,
  channelsRenamingState,
  messagesFetchingState,
  messagesAddingState,
  messages,
  channels,
  chatState,
  form: formReducer,
  i18n: i18nReducer,
});
