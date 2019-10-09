import React from 'react';
import { connect } from 'react-redux';
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
    if (!messageList || messageList.length < 1) {
      return (
        <div>
          <strong>No messages</strong>
        </div>
      );
    }
    return (
      <ListGroup>
        {messageList.map(message => (
          <ListGroupItem className="d-flex flex-column" key={message.id}>
              <strong>
                {message.author}
                <small>{message.date}</small>
              </strong>
              {message.text}
            </ListGroupItem>
        ))
        }
      </ListGroup>
    );
  }

  render() {
    return (
      <div className="overflow-auto mt-auto">
        {this.renderMessages()}
      </div>
    );
  }
}
