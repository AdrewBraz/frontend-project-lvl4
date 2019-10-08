import React from 'react';
import { connect } from 'react-redux';
import { sortBy } from 'lodash';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { messages, channelState } = state;
  const { currentChannelId } = channelState;
  const props = { currentChannelId, messages };
  return props;
};

const actionCreators = {
  fetchMessages: actions.fetchMessages,
};

export default @connect(mapStateToProps, actionCreators)
class MessagesList extends React.Component {
  componentDidMount() {
    const { currentChannelId, messages } = this.props;
    const { fetchMessages } = this.props;
    const messageList = messages[currentChannelId];
    fetchMessages(currentChannelId, messageList);
  }

  renderMessages() {
    const { currentChannelId, messages } = this.props;
    const messageList = messages[currentChannelId];
    return (
      <ListGroup>
        {messageList ? messageList.map(message => <ListGroupItem key={message.id}>{message.text}</ListGroupItem>) : null}
      </ListGroup>
    );
  }

  render() {
    const { messageList, channelState } = this.props;
    return (
      <div className="overflow-auto mt-auto">
        {this.renderMessages()}
      </div>
    );
  }
}
