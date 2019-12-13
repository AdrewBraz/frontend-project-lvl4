// @ts-check

import { connect } from 'react-redux';
import {
  switchChannel, modalStateEdit, modalStateDelete, modalStateClose,
} from './reducers/chatSlice';
import { addChannel, renameChannel, removeChannel } from './reducers/channelsSlice';
import { fetchMessages, addMessage } from './reducers/messagesSlice';

const actionCreators = {
  switchChannel,
  modalStateEdit,
  modalStateDelete,
  modalStateClose,
  addChannel,
  renameChannel,
  removeChannel,
  fetchMessages,
  addMessage,
};

export default mapStateToProps => Component => connect(mapStateToProps, actionCreators)(Component);
