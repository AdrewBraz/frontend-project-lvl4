import { omit, without, keyBy } from 'lodash';
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
  [actions.fetchMessagesSuccess](state, { payload }) {
    return {
      byId: keyBy(payload.tasks, 'id'),
      allIds: payload.tasks.map(t => t.id),
    };
  },
  [actions.addMessageSuccess](state, { payload: { task } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [task.id]: task },
      allIds: [task.id, ...allIds],
    };
  },
  [actions.removeMessageSuccess](state, { payload: { id } }) {
    const { byId, allIds } = state;
    return {
      byId: omit(byId, id),
      allIds: without(allIds, id),
    };
  },
}, { byId: {}, allIds: [] });

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
