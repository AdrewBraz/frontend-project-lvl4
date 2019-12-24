// @ts-check
import React from 'react';
import { sortBy } from 'lodash';
import cn from 'classnames';

import connect from '../connect';

const mapStateToProps = (state) => {
  const { channels, chatState } = state;
  const channelList = sortBy(channels.ByIds);
  const props = { chatState, channels, channelList };
  return props;
};

export default @connect(mapStateToProps)
class ChannelsList extends React.Component {
  handleSwitch = id => (e) => {
    e.preventDefault();
    const { switchChannel, channels, fetchMessages } = this.props;
    if (channels.currentChannelId !== id) {
      switchChannel({ id });
      fetchMessages(id);
    }
  }

  handleModalEdit = id => (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { modalStateEdit } = this.props;
    modalStateEdit(id);
  }

  renderEditBtn = id => <button type="button" onClick={this.handleModalEdit({ id })} className="btn btn-sm float-right btn-info">Edit</button>

  renderChannels = () => {
    const { channelList, channels } = this.props;
    const { currentChannelId } = channels;
    return channelList.map((channel) => {
      const isActive = channel.id === currentChannelId;
      const classList = cn({
        active: isActive,
        'list-group-item-action list-group-item': true,
      });
      return (
        <a className={classList} href={`#${channel.id}`} key={channel.id} onClick={this.handleSwitch(channel.id)}>
          {channel.name}
          {channel.removable ? this.renderEditBtn(channel.id) : null}
        </a>
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
