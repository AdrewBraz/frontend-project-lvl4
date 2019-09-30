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
};

export default @connect(mapStateToProps, actionCreators)
class ChannelsList extends React.Component {
  handleSwitch = id => () => {
    const { switchChannel, channelState } = this.props;
    if (channelState.currentChannelId !== id) {
      switchChannel({ id });
    }
  }

  render() {
    const { channelsList } = this.props;
    return (
      <ListGroup>
        {channelsList.map(channel => <ListGroupItem key={channel.id} id={channel.id} onClick={this.handleSwitch(channel.id)} removable={false ? channel.removable : undefined}>{channel.name}</ListGroupItem>)}
      </ListGroup>
    );
  }
}
