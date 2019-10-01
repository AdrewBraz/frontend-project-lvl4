import React from 'react';
import { connect } from 'react-redux';
import { sortBy } from 'lodash';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { messages, channelState } = state;
  const props = { channelState, messages };
  return props;
};

const actionCreators = {
  fetchMessages: actions.fetchMessages,
};

export default @connect(mapStateToProps, actionCreators)
class MessagesList extends React.Component {
  componentDidMount() {
    const { currentChannelId } = this.props.channelState;
    const { fetchMessages } = this.props;
    fetchMessages(currentChannelId);
  }

  render() {
    return (
      <div />
    );
  }
}
