// @ts-check
import React from 'react';
import { sortBy } from 'lodash';
import cn from 'classnames';
import { Translate } from 'react-redux-i18n';
import connect from '../connect';


const mapStateToProps = state => ({
  chatState: state.chatState,
  channels: state.channels,
  channelList: sortBy(state.channels.allIds.map(i => state.channels.ByIds[i]), 'id'),
});

export default @connect(mapStateToProps)
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
    const { modalStateEdit } = this.props;
    modalStateEdit(id);
  }

  renderEditBtn = (id) => {
    const editBtn = <Translate value="application.editBtn" />;
    return (
      <button type="button" onClick={this.handleModalEdit({ id })} className="btn btn-sm float-right btn-info">
        {editBtn}
      </button>
    );
  }

  renderChannels = () => {
    const { channelList, chatState } = this.props;
    const { currentChannelId } = chatState;
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
