// @ts-check
import { createSlice } from '@reduxjs/toolkit';

const channelsAddingSlice = createSlice({
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
  addChannelRequest,
  addChannelSuccess,
  addChannelFailure,
} = channelsAddingSlice.actions;

export default channelsAddingSlice.reducer;
