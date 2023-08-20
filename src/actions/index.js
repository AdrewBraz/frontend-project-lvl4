// @ts-check

import {
  modalStateEdit, modalStateAdd, modalStateDelete, modalStateSubscribe, modalStateClose, switchChat, createUser, loginUser
} from '../reducers/chatSlice';
import {
  renameChannel, removeChannel, addChannelToStore,
} from '../reducers/channelsSlice';
import { fetchMessages, addMessage } from '../reducers/messagesSlice';

const actions = {
  switchChat,
  modalStateEdit,
  modalStateDelete,
  modalStateClose,
  modalStateSubscribe,
  modalStateAdd,
  addChannelToStore,
  renameChannel,
  removeChannel,
  fetchMessages,
  addMessage,
  createUser,
  loginUser
};

export default actions;
