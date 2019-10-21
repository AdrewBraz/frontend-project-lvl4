import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';
import { omitBy, without } from 'lodash';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';


const MessagesFetchingState = handleActions({
  [actions.fetchMessagesRequest]() {
    return 'requested';
  },
  [actions.fetchMessagesFailure]() {
    return 'failed';
  },
  [actions.fetchMessagesSuccess]() {
    return 'finished';
  },
}, null);

const ChannelsAddingState = handleActions({
  [actions.addChannelRequest]() {
    return 'requested';
  },
  [actions.addChannelFailure]() {
    return 'failed';
  },
  [actions.addChannelSuccess]() {
    return 'finished';
  },
}, null);

const ChannelsRemovingState = handleActions({
  [actions.removeChannelRequest]() {
    return 'requested';
  },
  [actions.removeChannelFailure]() {
    return 'failed';
  },
  [actions.removeChannelSuccess]() {
    return 'finished';
  },
}, null);

const ChannelsRenamingState = handleActions({
  [actions.renameChannelRequest]() {
    return 'requested';
  },
  [actions.renameChannelFailure]() {
    return 'failed';
  },
  [actions.renameChannelSuccess]() {
    return 'finished';
  },
}, null);

const MessagesAddingState = handleActions({
  [actions.addMessageRequest]() {
    return 'requested';
  },
  [actions.addMessageFailure]() {
    return 'failed';
  },
  [actions.addMessageSuccess]() {
    return 'finished';
  },
}, null);

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
  [actions.renameChannelSuccess](state) {
    return {
      ...state,
      channelEditId: null,
    };
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

const appState = handleActions({
  [combineActions(
    actions.socketDisconnected,
    actions.addChannelRequest,
    actions.renameChannelRequest,
    actions.removeChannelRequest,
    actions.addMessageRequest,
  )]() {
    return 'processing';
  },
  [combineActions(
    actions.socketConnected,
    actions.addChannelSuccess,
    actions.renameChannelSuccess,
    actions.removeChannelSuccess,
    actions.addMessageSuccess,
  )]() {
    return 'finished';
  },
}, 'finished');

export default combineReducers({
  appState,
  connectionState,
  ChannelsAddingState,
  ChannelsRemovingState,
  ChannelsRenamingState,
  MessagesFetchingState,
  MessagesAddingState,
  messages,
  channels,
  chatState,
  form: formReducer,
});
