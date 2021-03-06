// @ts-check

import {
  modalStateEdit, modalStateAdd, modalStateDelete, modalStateClose, switchChannel,
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
};

export default actions;
