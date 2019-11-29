// @ts-check
import { createSlice } from '@reduxjs/toolkit';
import { omitBy, without } from 'lodash';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {},
  reducers: {
  addChannelSuccess(state, { payload: { newChannel } }) {
      const { ByIds, allIds } = state;
      return {
        ByIds: { ...ByIds, [newChannel.id]: newChannel },
        allIds: [...allIds, newChannel.id],
      };
    },
  renameChannelSuccess(state, { payload: { renamedChannel } }) {
      const { id } = renamedChannel;
      const { ByIds, allIds } = state;
      return {
        ByIds: { ...ByIds, [id]: renamedChannel },
        allIds: [...allIds],
      };
    },
  removeChannelSuccess(state, { payload: { id } }) {
      const { ByIds, allIds } = state;
      return {
        ByIds: omitBy(ByIds, ch => ch.id === id),
        allIds: without(allIds, id),
      };
    },
  }
  });

export default channelsSlice.reducer;
