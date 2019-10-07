import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import gon from 'gon';
import io from 'socket.io-client';
import _ from 'lodash';
import reducers from './reducers';
import * as actions from './actions';

import App from './components/App';
import getUserName from './getUserName';
import User from './context';

const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
const user = {
  name: getUserName(),
};

const initialState = {
  channels: {
    allIds: gon.channels.map(channel => channel.id),
    ByIds: _.keyBy(gon.channels, 'id'),
  },
  messages: {},
  channelState: {
    currentChannelId: gon.currentChannelId,
  },
};

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);

const socketInit = (store) => {
  const port = process.env.PORT;
  const socket = io(port);

  socket.on('connect', () => {
    console.log('socket connected');
    store.dispatch(actions.socketConnected());
  });
  socket.on('disconnect', () => {
    console.log('socket disconnected');
    store.dispatch(actions.socketDisconnected());
  });
  socket.on('newChannel', ({ data: { attributes } }) => {
    console.log('newChannel');
    store.dispatch(actions.addChannelSuccess({ newChannel: attributes }));
  });
  socket.on('newMessage', ({ data: { attributes } }) => {
    console.log('newMessage');
    store.dispatch(actions.addMessageSuccess({ newMessage: attributes }));
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
