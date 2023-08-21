/* eslint-disable no-param-reassign */
// @ts-check

import { createSlice } from '@reduxjs/toolkit';



const allChatsSlice = createSlice({
  name: 'allChats',
  initialState: [],
  reducers: {
    getChats(state, { payload }) {
      state = payload;
      return state
    },
  }
});

export const { getChats } = allChatsSlice.actions;

export default allChatsSlice.reducer;
