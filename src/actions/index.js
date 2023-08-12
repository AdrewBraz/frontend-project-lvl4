// @ts-check

import {
  modalStateEdit, modalStateAdd, modalStateDelete, modalStateClose, switchChannel, createUser
} from '../reducers/chatSlice';
import {
  renameChannel, removeChannel, addChannelToStore,
} from '../reducers/channelsSlice';
import { fetchMessages, addMessage } from '../reducers/messagesSlice';

const actions = {
  switchChannel,
  modalStateEdit,
  modalStateDelete,
  modalStateClose,
  modalStateAdd,
  addChannelToStore,
  renameChannel,
  removeChannel,
  fetchMessages,
  addMessage,
  createUser
};

export default actions;
