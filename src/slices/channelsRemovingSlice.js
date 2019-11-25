// @ts-check
import { createSlice } from '@reduxjs/toolkit';

const channelsRemovingSlice = createSlice({
  name: 'channelsRemovingState',
  initialState: null,
  reducers: {
    removeChannelRequest() {
      return 'requested';
    },
    removeChannelFailure() {
      return 'failed';
    },
    removeChannelSuccess() {
      return 'finished';
    },
  },
});

export const {
  removeChannelFailure, removeChannelRequest, removeChannelSuccess,
} = channelsRemovingSlice.actions;

export default channelsRemovingSlice.reducer;
