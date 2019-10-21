import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import gon from 'gon';
import io from 'socket.io-client';
import { composeWithDevTools } from 'redux-devtools-extension';
import _ from 'lodash';
import reducers from './reducers';
import * as actions from './actions';

import App from './components/App';
import getUserName from './getUserName';
import User from './context';


const user = {
  name: getUserName(),
};

const initialState = {
  channels: {
    allIds: gon.channels.map(channel => channel.id),
    ByIds: _.keyBy(gon.channels, 'id'),
  },
  messages: {},
  chatState: {
    currentChannelId: gon.currentChannelId,
    modal: 'closed',
  },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

const socketInit = (socketStore) => {
  const port = process.env.PORT;
  const socket = io(port);

  socket.on('connect', () => {
    socketStore.dispatch(actions.socketConnected());
  });
  socket.on('disconnect', () => {
    socketStore.dispatch(actions.socketDisconnected());
  });
  socket.on('newChannel', ({ data: { attributes } }) => {
    socketStore.dispatch(actions.addChannelSuccess({ newChannel: attributes }));
  });
  socket.on('newMessage', ({ data: { attributes } }) => {
    socketStore.dispatch(actions.addMessageSuccess({ newMessage: attributes }));
  });
  socket.on('renameChannel', ({ data: { attributes } }) => {
    socketStore.dispatch(actions.renameChannelSuccess({ renamedChannel: attributes }));
  });
  socket.on('removeChannel', ({ data: { id } }) => {
    socketStore.dispatch(actions.removeChannelSuccess(id));
  });
};

socketInit(store);

export default () => {
  render(
    <Provider store={store}>
      <User.Provider value={user}>
        <App />
      </User.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
