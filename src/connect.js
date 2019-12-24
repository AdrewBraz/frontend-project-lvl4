// @ts-check

import { connect } from 'react-redux';
import {
  modalStateEdit, modalStateDelete, modalStateClose,
} from './reducers/chatSlice';
import {
  switchChannel, renameChannel, removeChannel, addChannelToStore,
} from './reducers/channelsSlice';
import { fetchMessages, addMessage } from './reducers/messagesSlice';

const actionCreators = {
  switchChannel,
  modalStateEdit,
  modalStateDelete,
  modalStateClose,
  addChannelToStore,
  renameChannel,
  removeChannel,
  fetchMessages,
  addMessage,
};

export default mapStateToProps => Component => connect(mapStateToProps, actionCreators)(Component);
