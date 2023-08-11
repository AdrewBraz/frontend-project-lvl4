// @ts-check
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';
import Cookies from 'js-cookie';
import io from 'socket.io-client';

import App from './components/App';
import './i18n';
import reducers from './reducers';
import User from './context';
import { socketConnected, socketDisconnected } from './reducers/connectionSlice';
import { renameChannel, removeChannel, addChannelToStore } from './reducers/channelsSlice';
import { addMessage } from './reducers/messagesSlice';

export default () => {
  const userName = faker.internet.userName();
  Cookies.set('name', userName);


  const initialState = {
    channels: [],
    chatState: {
      modal: 'closed',
      currentChannelId: '64d4b0faf22e59a3b037df3a',
    },
    messages: [],
  };

  const store = configureStore({
    reducer: reducers,
    preloadedState: initialState,
  });

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
    store.dispatch(addMessage({ newMessage: attributes }));
  });
  socket.on('renameChannel', ({ data: { attributes } }) => {
    store.dispatch(renameChannel({ renamedChannel: attributes }));
  });
  socket.on('removeChannel', ({ data: { id } }) => {
    store.dispatch(removeChannel({ id }));
  });
  render(
    <Provider store={store}>
      <User.Provider value={userName}>
        <App />
      </User.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
