// @ts-check
import { createSlice } from '@reduxjs/toolkit';
import { omitBy, without } from 'lodash';
import axios from 'axios';

import { addChannelFailure, addChannelRequest, addChannelSuccess } from './channelsAddingSlice';
import { removeChannelFailure, removeChannelRequest, removeChannelSuccess } from './channelsRemovingSlice';
import { renameChannelFailure, renameChannelRequest, renameChannelSuccess } from './channelsRenamingSlice';
import routes from '../routes';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {},
  reducers: {},
  extraReducers: {
    [addChannelSuccess](state, { payload: { newChannel } }) {
      const { ByIds, allIds } = state;
      ByIds[newChannel.id] = newChannel;
      allIds.push(newChannel.id);
    },
    [renameChannelSuccess](state, { payload: { renamedChannel } }) {
      const { id } = renamedChannel;
      const { ByIds } = state;
      ByIds[id] = renamedChannel;
    },
    [removeChannelSuccess](state, { payload: { id } }) {
      const { ByIds, allIds } = state;
      return {
        ByIds: omitBy(ByIds, ch => ch.id === id),
        allIds: without(allIds, id),
      };
    },
  },
});

export const addChannel = name => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    const data = { attributes: name };
    await axios.post(routes.channelsPath(), { data });
    dispatch(addChannelSuccess);
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

export { removeChannelSuccess, addChannelSuccess, renameChannelSuccess };

export default channelsSlice.reducer;
