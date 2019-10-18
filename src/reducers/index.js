import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { omitBy, without } from 'lodash';
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
      allIds: [...allIds, newChannel.id],
    };
  },
  [actions.renameChannelSuccess](state, { payload: { renamedChannel } }) {
    const { id } = renamedChannel;
    const { ByIds, allIds } = state;
    return {
      ByIds: { ...ByIds, [id]: renamedChannel },
      allIds: [...allIds],
    };
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    const { ByIds, allIds } = state;
    return {
      ByIds: omitBy(ByIds, ch => ch.id === id),
      allIds: without(allIds, id),
    };
  },
}, {});

const chatState = handleActions({
  [actions.switchChannel](state, { payload: { id } }) {
    return { ...state, currentChannelId: id };
  },
  [actions.modalStateEdit](state, { payload: { id } }) {
    return { ...state, channelEditId: id, modal: 'edit' };
  },
  [actions.modalStateClose](state) {
    return { ...state, channelEditId: null, modal: 'close' };
  },
  [actions.modalStateDelete](state) {
    return { ...state, modal: 'delete' };
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    const { currentChannelId } = state;
    const defaultChannelId = 1;
    return {
      ...state,
      channelEditId: null,
      currentChannelId: id === currentChannelId ? defaultChannelId : currentChannelId,
    };
  },
}, {});

export default combineReducers({
  connectionState,
  MeassagesFetchingState,
  messages,
  channels,
  chatState,
  form: formReducer,
});
