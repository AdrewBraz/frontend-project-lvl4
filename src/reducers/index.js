import { omit, without, keyBy } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';


const MeassagesFetchingState = handleActions({
  [actions.fetchTasksRequest]() {
    return 'requested';
  },
  [actions.fetchTasksFailure]() {
    return 'failed';
  },
  [actions.fetchTasksSuccess]() {
    return 'finished';
  },
}, 'none');

const messages = handleActions({
  [actions.fetchMessagesSuccess](state, { payload }) {
    return {
      byId: keyBy(payload.tasks, 'id'),
      allIds: payload.tasks.map(t => t.id),
    };
  },
  [actions.addMessagesSuccess](state, { payload: { task } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [task.id]: task },
      allIds: [task.id, ...allIds],
    };
  },
  [actions.removeMessagesSuccess](state, { payload: { id } }) {
    const { byId, allIds } = state;
    return {
      byId: omit(byId, id),
      allIds: without(allIds, id),
    };
  },
}, { byId: {}, allIds: [] });

export default combineReducers({
  MeassagesFetchingState,
  messages,
  form: formReducer,
});
