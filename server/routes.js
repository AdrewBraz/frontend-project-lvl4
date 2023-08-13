import _ from 'lodash';
import UserController from './controllers/UserController';
import MessageController from './controllers/MessageController';
import GroupController from './controllers/GroupController';

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
    .get('/api/v1/channels', (_req, reply) => {
      const resources = state.channels.map((c) => ({
        type: 'channels',
        id: c.id,
        attributes: c,
      }));
      const response = {
        data: resources,
      };
      reply.send(response);
    })
    .post('/api/v1/channels', async (req, reply) => {
      console.log('this is channel')
      const data = await GroupController.postChat(req)
      io.emit('newChannel', data);
    })
    .delete('/api/v1/channels/:id', (req, reply) => {
      const channelId = Number(req.params.id);
      state.channels = state.channels.filter((c) => c.id !== channelId);
      state.messages = state.messages.filter((m) => m.channelId !== channelId);
      reply.code(204);
      const data = {
        data: {
          type: 'channels',
          id: channelId,
        },
      };

      reply.send(data);
      io.emit('removeChannel', data);
    })
    .patch('/api/v1/channels/:id', (req, reply) => {
      const channelId = Number(req.params.id);
      console.log(channelId)
      const channel = state.channels.find((c) => c.id === channelId);

      const { data: { attributes } } = req.body;
      channel.name = attributes.name;

      const data = {
        data: {
          type: 'channels',
          id: channelId,
          attributes: channel,
        },
      };
      reply.send(data);
      io.emit('renameChannel', data);
    })
    .get('/api/v1/channels/:channelId/messages', (req, reply) => {
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
      const data = await MessageController.postMessage(_req, reply)
    })
    .post('/login', async (_req, reply) => {
      const {refreshToken, accessToken, chat, user, chatList} = await UserController.registration(_req, reply)
      const data = { refreshToken, accessToken, chat, user, chatList}
      reply.send({ data})
      reply.setCookie('refreshToken', refreshToken, {httpOnly: true})
      io.emit('login', {data});
    })
};
