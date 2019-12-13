// @ts-check
import { createSlice } from '@reduxjs/toolkit';

const messagesAddingSlice = createSlice({
  name: 'messagesAddingState',
  initialState: null,
  reducers: {
    addMessageRequest() {
      return 'requested';
    },
    addMessageFailure() {
      return 'failed';
    },
    addMessageSuccess() {
      return 'finished';
    },
  },
});

export const {
  addMessageFailure,
  addMessageSuccess,
  addMessageRequest,
} = messagesAddingSlice.actions;

export default messagesAddingSlice.reducer;
