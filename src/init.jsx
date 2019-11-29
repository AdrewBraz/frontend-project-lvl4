// @ts-check
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import gon from 'gon';
import io from 'socket.io-client';
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';
import _ from 'lodash';
import reducers from './reducers';
import * as actions from './actions';
import translations from './translations.json';

import App from './components/App';
import getUserName from './getUserName';
import User from './context';

const userName = getUserName();

const user = {
  userName,
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


const store = configureStore({
  reducer: reducers,
  preloadedState: initialState,
});

export default () => {
  const port = process.env.PORT;
  const socket = io(port);

  socket.on('connect', () => {
    store.dispatch(actions.socketConnected());
  });
  socket.on('disconnect', () => {
    store.dispatch(actions.socketDisconnected());
  });
  socket.on('newChannel', ({ data: { attributes } }) => {
    store.dispatch(actions.addChannelSuccess({ newChannel: attributes }));
  });
  socket.on('newMessage', ({ data: { attributes } }) => {
    store.dispatch(actions.addMessageSuccess({ newMessage: attributes }));
  });
  socket.on('renameChannel', ({ data: { attributes } }) => {
    store.dispatch(actions.renameChannelSuccess({ renamedChannel: attributes }));
  });
  socket.on('removeChannel', ({ data: { id } }) => {
    store.dispatch(actions.removeChannelSuccess(id));
  });
  syncTranslationWithStore(store);
  store.dispatch(loadTranslations(translations));
  store.dispatch(setLocale('en'));

  render(
    <Provider store={store}>
      <User.Provider value={user}>
        <App />
      </User.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
