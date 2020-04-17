// @ts-check

import { connect } from 'react-redux';
import {
  modalStateEdit, modalStateAdd, modalStateDelete, modalStateClose, switchChannel,
} from './reducers/chatSlice';
import {
  renameChannel, removeChannel, addChannelToStore,
} from './reducers/channelsSlice';
import { fetchMessages, addMessage } from './reducers/messagesSlice';

const actionCreators = {
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

export default mapStateToProps => Component => connect(mapStateToProps, actionCreators)(Component);
