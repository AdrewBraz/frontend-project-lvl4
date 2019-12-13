// @ts-check
import { createSlice } from '@reduxjs/toolkit';

const connectionSlice = createSlice({
  name: 'connectionState',
  initialState: null,
  reducers: {
    socketConnected() {
      return 'connected';
    },
    socketDisconnected() {
      return 'disconnected';
    },
  },
});

export const { socketConnected, socketDisconnected } = connectionSlice.actions;

export default connectionSlice.reducer;
