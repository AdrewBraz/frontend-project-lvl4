// @ts-check

import {
  modalStateEdit, modalStateAdd, modalStateDelete, modalStateSubscribe, modalStateClose, switchChat, loginUser, checkAuth, modalStateProfile
} from '../reducers/chatSlice';
import {
  renameChannel, removeChannel, addChannelToStore,
} from '../reducers/channelsSlice';
import { fetchMessages, addMessage } from '../reducers/messagesSlice';
import { getChats } from '../reducers/allChatsSlice';

const actions = {
  switchChat,
  modalStateEdit,
  modalStateDelete,
  modalStateClose,
  modalStateSubscribe,
  modalStateAdd,
  addChannelToStore,
  modalStateProfile,
  renameChannel,
  removeChannel,
  fetchMessages,
  addMessage,
  loginUser,
  getChats,
  checkAuth
};

export default actions;
