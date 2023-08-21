import _ from 'lodash';
import UserController from './controllers/UserController';
import MessageController from './controllers/MessageController';
import GroupController from './controllers/GroupController';
import { emit } from 'nodemon';

const getNextId = () => Number(_.uniqueId());

const buildState = (defaultState) => {
  const state = {
    groups: [
    ],
    messages: [],
    currentChannelId: '',
  };

  return state;
};

export default (app, io, defaultState = {}) => {
  const state = buildState(defaultState);

  app
    .get('/', (_req, reply) => {
      reply.view('index.pug');
    })
    .get('/api/v1/channels/:id', async (_req, reply) => {
      const data = await GroupController.getChat(_req, reply)
      io.emit('switchChat', data)
    })
    .post('/api/v1/channels', async (req, reply) => {
      const data = await GroupController.postChat(req)
      io.emit('newChannel', data);
    })
    .delete('/api/v1/channels/:id', async (req, reply) => {
      const data = await GroupController.deleteChatById(req, reply)
      await MessageController.deleteMessages(data)
      console.log(data)
      reply.send('Messages has been deleted')
      io.emit('removeChannel', data);
    })
    .patch('/api/v1/channels/:id', async (req, reply) => {
      const updatedChat = await GroupController.editChatName(req, reply)

      const data = {
        data: {
          type: 'channels',
          id: updatedChat.id,
          attributes: updatedChat,
        },
      };
      io.emit('renameChannel', data);
    })
    .get('/api/v1/channels/:channelId/messages', (req, reply) => {
      console.log('action')
      const messages = state.messages.filter((m) => m.channelId === Number(req.params.channelId));
      const resources = messages.map((m) => ({
        type: 'messages',
        id: m.id,
        attributes: m,
      }));
      const response = {
        data: resources,
      };
      reply.send(response);
    })
    .post('/api/v1/channels/:channelId/messages', async (_req, reply) => {
      const newMessage = await MessageController.postMessage(_req, reply)
      io.emit('message', {data: {newMessage}})
    })
    .post('/registration', async (_req, reply) => {
      const data  = await UserController.registration(_req, reply)
      io.emit('registration', {data});
    })
    .post('/login', async (_req, reply) => {
      const data  = await UserController.login(_req, reply)
      io.emit('login', {data});
    })
    .post('/logout', async (_req, reply) => {
      const data  = await UserController.logout(_req, reply)
      io.emit('login', {data});
    })
    .post('/refresh', async (_req, reply) => {
      const data  = await UserController.refresh(_req, reply)
      io.emit('refresh', {data});
    })
    .get('/chats', async (_req, reply) => {
      const data  = await GroupController.getChats(_req, reply)
      io.emit('getChats', {chats: data});
    })
};
