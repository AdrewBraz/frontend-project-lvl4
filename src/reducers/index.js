import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';


const MeassagesFetchingState = handleActions({
  [actions.fetchMessagesRequest]() {
    return 'requested';
  },
  [actions.fetchMessagesFailure]() {
    return 'failed';
  },
  [actions.fetchMessagesSuccess]() {
    return 'finished';
  },
}, 'none');

const connectionState = handleActions({
  [actions.socketConnected]() {
    return 'connected';
  },
  [actions.socketDisconnected]() {
    return 'disconnected';
  },
}, null);

const messages = handleActions({
  [actions.fetchMessagesSuccess](state, { payload: { id, channelMessages } }) {
    return { ...state, [id]: channelMessages };
  },
  [actions.addMessageSuccess](state, { payload: { newMessage } }) {
    const { channelId } = newMessage;
    const messageList = state[channelId] ? [...state[channelId], newMessage] : [newMessage];
    return { ...state, [channelId]: messageList };
  },
}, {});

const channels = handleActions({
  [actions.addChannelSuccess](state, { payload: { newChannel } }) {
    const { ByIds, allIds } = state;
    return {
      ByIds: { ...ByIds, [newChannel.id]: newChannel },
      allIds: [newChannel.id, ...allIds],
    };
  },
}, { ByIds: {}, allIds: [] });

const channelState = handleActions({
  [actions.switchChannel](state, { payload: { id } }) {
    return { currentChannelId: id };
  },
}, { currentChannelId: null });

export default combineReducers({
  connectionState,
  MeassagesFetchingState,
  messages,
  channels,
  channelState,
  form: formReducer,
});
