// @ts-check
import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Translate } from 'react-redux-i18n';

import connect from '../connect';

const mapStateToProps = (state) => {
  const { messages, channels } = state;
  const { currentChannelId } = channels;
  const messageList = messages.filter(ch => ch.channelId === currentChannelId);
  const props = { messageList };
  return props;
};


export default @connect(mapStateToProps)
class MessagesList extends React.Component {
  renderMessages() {
    const { messageList } = this.props;
    if (!messageList || messageList.length < 1) {
      return (
        <div className="d-flex flex-column align-items-center justify-content-center h-100">
          <strong className="display-2"><Translate value="application.messages" /></strong>
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
      <div style={{ height: '70vh' }} className="border border-dark rounded overflow-auto mt-auto mb-3">
        {this.renderMessages()}
      </div>
    );
  }
}
