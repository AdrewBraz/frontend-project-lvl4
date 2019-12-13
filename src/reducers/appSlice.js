// @ts-check
import { createSlice } from '@reduxjs/toolkit';
import { socketConnected, socketDisconnected } from './connectionSlice';
import { addMessageSuccess, addMessageRequest } from './messagesAddingSlice';
import { addChannelSuccess, addChannelRequest } from './channelsAddingSlice';
import { removeChannelSuccess, removeChannelRequest } from './channelsRemovingSlice';
import { renameChannelRequest, renameChannelSuccess } from './channelsRenamingSlice';

const appSlice = createSlice({
  name: 'appState',
  initialState: null,
  reducers: {},
  extraReducers: {
    [socketDisconnected]() {
      return 'processing';
    },
    [socketConnected]() {
      return 'finished';
    },
    [addMessageRequest]() {
      return 'processing';
    },
    [addMessageSuccess]() {
      return 'finished';
    },
    [addChannelRequest]() {
      return 'processing';
    },
    [addChannelSuccess]() {
      return 'finished';
    },
    [removeChannelRequest]() {
      return 'processing';
    },
    [removeChannelSuccess]() {
      return 'finished';
    },
    [renameChannelRequest]() {
      return 'processing';
    },
    [renameChannelSuccess]() {
      return 'finished';
    },
  },
});

export default appSlice.reducer;
