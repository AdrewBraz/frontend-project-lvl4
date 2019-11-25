// @ts-check
import { createSlice } from '@reduxjs/toolkit';
import { socketConnected, socketDisconnected } from './connectionSlice';
import { addMessageSuccess, addMessageRequest } from './messagesAddingSlice';
import { addChannelSuccess, addChannelRequest } from './channelsAddingSlice';
import { renameChannelRequest, renameChannelSuccess } from './channelsRenamingSlice';
import { removeChannelSuccess, removeChannelRequest } from './channelsRemovingSlice';


const appSlice = createSlice({
  name: 'appState',
  initialState: 'finished',
  reducers: '',
  extraReducers: {
    [socketDisconnected]() { return 'processing'; },
    [addChannelRequest]() { return 'processing'; },
    [addMessageRequest]() { return 'processing'; },
    [renameChannelRequest]() { return 'processing'; },
    [removeChannelRequest]() { return 'processing'; },
    [socketConnected]() { return 'finished'; },
    [addChannelSuccess]() { return 'finished'; },
    [addMessageSuccess]() { return 'finished'; },
    [removeChannelSuccess]() { return 'finished'; },
    [renameChannelSuccess]() { return 'finished'; },
  },
});

export default appSlice.reducer;
