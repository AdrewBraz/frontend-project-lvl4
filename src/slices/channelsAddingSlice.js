// @ts-check
import { createSlice } from '@reduxjs/toolkit';

export const channelsAddingSlice = createSlice({
  name: 'channelsAddingState',
  initialState: null,
  reducers: {
    addChannelRequest() {
      return 'requested';
    },
    addChannelFailure() {
      return 'failed';
    },
    addChannelSuccess() {
      return 'finished';
    },
  },
});

export const {
  addChannelFailure, addChannelRequest, addChannelSuccess,
} = channelsAddingSlice.actions;

export default channelsAddingSlice.reducer;
