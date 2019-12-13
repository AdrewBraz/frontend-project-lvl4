// @ts-check
import { createSlice } from '@reduxjs/toolkit';

const channelsARemovingSlice = createSlice({
  name: 'channelsARemovingState',
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
  removeChannelRequest,
  removeChannelSuccess,
  removeChannelFailure,
} = channelsARemovingSlice.actions;

export default channelsARemovingSlice.reducer;
