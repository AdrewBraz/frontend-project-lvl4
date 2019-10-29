import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import connect from '../connect';

const mapStateToProps = (state) => {
  const { messages, chatState } = state;
  const { currentChannelId } = chatState;
  const props = { currentChannelId, messages };
  return props;
};


export default @connect(mapStateToProps)
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
        <div className="d-flex flex-column align-items-center justify-content-center h-100">
          <strong className="display-2">no messages</strong>
        </div>
      );
    }
    return (
      <ListGroup>
        {messageList.map(message => (
          <ListGroupItem className="d-flex flex-column" key={message.id}>
            <div className="d-flex justify-content-between">
              <strong>{message.author}</strong>
              <span className="font-weight-light">{message.date}</span>
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
