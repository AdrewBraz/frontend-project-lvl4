import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { messages, chatState } = state;
  const { currentChannelId } = chatState;
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
          <strong>no messages</strong>
        </div>
      );
    }
    return (
      <ListGroup>
        {messageList.map(message => (
          <ListGroupItem className="d-flex flex-column" key={message.id}>
            <div className="d-flex justify-content-between">
              <strong>{message.author}</strong>
              <small>{message.date}</small>
            </div>
            <div>
              {message.text}
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }

  render() {
    return (
      <div style={{ height: '80vh' }} className="border border-dark rounded overflow-auto mt-auto mb-3">
        {this.renderMessages()}
      </div>
    );
  }
}
