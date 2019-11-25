// @ts-check
import { createSlice } from '@reduxjs/toolkit';

const messagesFetchingSlice = createSlice({
  name: 'messagesFetchingState',
  initialState: null,
  reducers: {
    fetchMessagesRequest() {
      return 'requested';
    },
    fetchMessagesFailure() {
      return 'failed';
    },
    fetchMessagesSuccess() {
      return 'finished';
    },
  },
});

export const {
  fetchMessagesFailure, fetchMessagesRequest, fetchMessagesSuccess,
} = messagesFetchingSlice.actions;

export default messagesFetchingSlice.reducer;
