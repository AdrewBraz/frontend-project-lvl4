import _ from 'lodash';
import UserController from './controllers/UserController';
import MessageController from './controllers/MessageController';
import GroupController from './controllers/GroupController';
import authMiddleware from './middlewares/auth-middleware';
import errorMiddleware from './middlewares/error-middleware';

const buildState = (defaultState) => {
  const state = {
    groups: [
    ],
    messages: [],
    currentChannelId: '',
  };

  return state;
};

export default (app, io, s3, defaultState = {}) => {
  const state = buildState(defaultState);

  app
    .get('/', (_req, reply) => {
      reply.view('index.pug');
    })
    .get('/api/v1/channels/:id', async (_req, reply) => {
      await GroupController.getChat(_req, reply)
    })
    .post('/api/v1/channels', {preHandler: authMiddleware}, async (req, reply) => {
      await GroupController.postChat(req, reply)
      // io.emit('newChannel', {data});
    })
    .delete('/api/v1/channels/:id', {preHandler: authMiddleware}, async (req, reply) => {
      const data = await GroupController.deleteChatById(req, reply)
      await MessageController.deleteMessages(data)
      reply.send('Messages has been deleted')
      io.emit('removeChannel', data);
    })
    .patch('/api/v1/channels/:id', {preHandler: authMiddleware}, async (req, reply) => {
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
    .post('/api/v1/channels/:channelId/messages',  async (_req, reply) => {
      const newMessage = await MessageController.postMessage(_req, reply, s3)
      io.emit('message', {data: {newMessage}})
    })
    .post('/registration', async (_req, reply) => {
      await UserController.registration(_req, reply)
    })
    .post('/login', async (_req, reply) => {
      await UserController.login(_req, reply)
      
    })
    .post('/logout', async (_req, reply) => {
      await UserController.logout(_req, reply)
    })
    .get('/refresh', async (_req, reply) => {
      await UserController.refresh(_req, reply)
    })
    .get('/chats', {preHandler: authMiddleware},  async (_req, reply) => {
      const data  = await GroupController.getChats(_req, reply)
      io.emit('getChats', {chats: data});
    })
    .post('/subscribe', async (_req, reply) => {
      await GroupController.subscribeToChannel(_req, reply)
    })
    .post('/unsubscribe', async (_req, reply) => {
      await GroupController.unsubscribeToChannel(_req, reply)
    })
    .post('/api/v1/profile/:id', {preHandler: authMiddleware}, async (req, reply) => {
      await GroupController.postChat(req, reply)
      // io.emit('newChannel', {data});
    })
    app.setErrorHandler(errorMiddleware)
};
