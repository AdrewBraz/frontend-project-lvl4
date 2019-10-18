import React from 'react';
import { connect } from 'react-redux';
import { sortBy } from 'lodash';
import cn from 'classnames';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { channels, chatState } = state;
  const channelsList = sortBy(channels.allIds.map(i => channels.ByIds[i]), 'id');
  const props = { chatState, channels, channelsList };
  return props;
};

const actionCreators = {
  switchChannel: actions.switchChannel,
  fetchMessages: actions.fetchMessages,
  modalEdit: actions.modalStateEdit,
};

export default @connect(mapStateToProps, actionCreators)
class ChannelsList extends React.Component {
  handleSwitch = id => (e) => {
    e.preventDefault();
    const { switchChannel, chatState, fetchMessages } = this.props;
    if (chatState.currentChannelId !== id) {
      switchChannel({ id });
      fetchMessages(id);
    }
  }

  handleModalEdit = id => (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { modalEdit } = this.props;
    modalEdit(id);
  }

  renderEditBtn = id => <button type="button" onClick={this.handleModalEdit({ id })} className="btn btn-sm float-right btn-info">Edit</button>

  renderChannels = () => {
    const { channelsList, chatState } = this.props;
    const { currentChannelId } = chatState;
    return channelsList.map((channel) => {
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
