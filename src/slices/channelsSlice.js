// @ts-check
import { createSlice } from '@reduxjs/toolkit';
import { omitBy, without } from 'lodash';
import { addChannelSuccess } from './channelsAddingSlice';
import { renameChannelSuccess } from './channelsRenamingSlice';
import { removeChannelSuccess } from './channelsRemovingSlice';


const channelsSlice = createSlice({
  name: 'channels',
  initialState: {},
  reducers: {},
  extraReducers: {
    [addChannelSuccess](state, { payload: { newChannel } }) {
      const { ByIds, allIds } = state;
      return {
        ByIds: { ...ByIds, [newChannel.id]: newChannel },
        allIds: [...allIds, newChannel.id],
      };
    },
    [renameChannelSuccess](state, { payload: { renamedChannel } }) {
      const { id } = renamedChannel;
      const { ByIds, allIds } = state;
      return {
        ByIds: { ...ByIds, [id]: renamedChannel },
        allIds: [...allIds],
      };
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

export default channelsSlice.reducer;
