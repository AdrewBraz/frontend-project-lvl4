// @ts-check
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import gon from 'gon';
import io from 'socket.io-client';
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';
import reducers from './reducers';
import translations from './translations.json';

import App from './components/App';
import getUserName from './getUserName';
import User from './context';
import { socketConnected, socketDisconnected } from './reducers/connectionSlice';
import { renameChannel, removeChannel, addChannelToStore } from './reducers/channelsSlice';
import { addMessageSuccess } from './reducers/messagesSlice';

const userName = getUserName();

const user = {
  userName,
};

const initialState = {
  channels: {
    allIds: gon.channels.map(channel => channel.id),
    ByIds: gon.channels,
    currentChannelId: 1,
  },
  messages: {},
  chatState: {
    currentChannelId: 1,
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
    store.dispatch(socketConnected());
  });
  socket.on('disconnect', () => {
    store.dispatch(socketDisconnected());
  });
  socket.on('newChannel', ({ data: { attributes } }) => {
    store.dispatch(addChannelToStore({ newChannel: attributes }));
  });
  socket.on('newMessage', ({ data: { attributes } }) => {
    store.dispatch(addMessageSuccess({ newMessage: attributes }));
  });
  socket.on('renameChannel', ({ data: { attributes } }) => {
    store.dispatch(renameChannel({ renamedChannel: attributes }));
  });
  socket.on('removeChannel', ({ data: { id } }) => {
    store.dispatch(removeChannel({ id }));
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
