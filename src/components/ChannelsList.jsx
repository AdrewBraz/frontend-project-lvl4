import React from 'react';
import { connect } from 'react-redux';
import { sortBy } from 'lodash';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { channels, channelState } = state;
  const channelsList = sortBy(channels.allIds.map(i => channels.ByIds[i]), 'id');
  const props = { channelState, channels, channelsList };
  return props;
};

const actionCreators = {
  switchChannel: actions.switchChannel,
  fetchMessages: actions.fetchMessages,
};

export default @connect(mapStateToProps, actionCreators)
class ChannelsList extends React.Component {
  handleSwitch = id => () => {
    const { switchChannel, channelState, fetchMessages } = this.props;
    if (channelState.currentChannelId !== id) {
      switchChannel({ id });
      fetchMessages(id);
    }
  }

  renderChannels = () => {
    const { channelsList, channelState } = this.props;
    const { currentChannelId } = channelState;
    return channelsList.map((channel) => {
      const isActive = channel.id === currentChannelId;
        <ListGroupItem key={channel.id} id={channel.id} onClick={this.handleSwitch(channel.id)} removable={false ? channel.removable : undefined}>{channel.name}</ListGroupItem>;
    });
  }

  render() {
    const { channelsList, channelState } = this.props;
    return (
      <ListGroup>
        {channelsList.map(channel => <ListGroupItem key={channel.id} id={channel.id} onClick={this.handleSwitch(channel.id)} removable={false ? channel.removable : undefined}>{channel.name}</ListGroupItem>)}
      </ListGroup>
    );
  }
}
