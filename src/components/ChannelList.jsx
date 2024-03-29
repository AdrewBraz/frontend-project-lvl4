// @ts-check
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortBy } from 'lodash';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from '../http';
import actions from '../actions';
import routes from '../routes';
import SubscriptionButton from './Buttons/SubscriptionButton';
import EditBtn from './Buttons/EditBtn';

const ChannelsList = () => {
  const channelList = useSelector((state) => sortBy(state.channels));
  const currentChannel = useSelector((state) => state.chatState.currentChannelId);
  const dispatch = useDispatch();

  const handleSwitch = (id) => async (e) => {
    e.preventDefault();
    const {data: {attributes } } = await axios.get(routes.channelPath(id));
    const { chat, messageList} = attributes
    dispatch(actions.switchChat({ chat, messageList }))
  };

  const handleModalEdit = (id) =>  {
    dispatch(actions.modalStateEdit({id}));
  };

  const renderEditBtn = (id) => (
    <button type="button" onClick={handleModalEdit({ id })} className="btn btn-sm float-right btn-info">
      <FontAwesomeIcon icon={faEdit} />
    </button>
  );

  const renderChannels = () => channelList.map((channel) => {
    const isActive = channel.id === currentChannel;
    const classList = cn({
      active: isActive,
      'list-group-item-action list-group-item d-flex justify-content-between': true,
    });
    return (
      <a className={classList} href={`#${channel.id}`} key={channel.id} onClick={handleSwitch(channel.id)}>
        {channel.groupName}
        {channel.role === 'admin' ? <EditBtn handleClick={handleModalEdit} id={channel.id} /> : null}
      </a>
    );
  });
  return (
    <div className="mb-3">
      <ul className="list-group">
        {renderChannels()}
      </ul>
    </div>
  );
};

export default ChannelsList;
