import React from 'react';
import { connect } from 'react-redux';
import { sortBy } from 'lodash';
import cn from 'classnames';

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
class ChannelList extends React.Component {
  handleSwitch = id => (e) => {
    e.preventDefault();
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
      const classList = cn({
        active: isActive,
        'list-group-item': true,
      });
      return (
        <li className={classList} key={channel.id} id={channel.id} onClick={this.handleSwitch(channel.id)} removable={false ? channel.removable : undefined}>
          <a>
            {channel.name}
          </a>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="mb-3">
        <ul className="list-group">
          {this.renderChannels()}
        </ul>
      </div>
    );
  }
}
