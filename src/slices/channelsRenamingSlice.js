// @ts-check
import { createSlice } from '@reduxjs/toolkit';

const channelsRenamingSlice = createSlice({
  name: 'channelsRenamingState',
  initialState: null,
  reducers: {
    renameChannelRequest() {
      return 'requested';
    },
    renameChannelFailure() {
      return 'failed';
    },
    renameChannelSuccess() {
      return 'finished';
    },
  },
});

export const {
  renameChannelFailure, renameChannelRequest, renameChannelSuccess,
} = channelsRenamingSlice.actions;

export default channelsRenamingSlice.reducer;
