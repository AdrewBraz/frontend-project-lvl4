const host = '';
const prefix = 'api/v1';

export default {
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
  signIn: (path) => path === 'registration' ? '/registration' : '/login',
  chats: () => '/chats',
  profilePath: (id) => [host, prefix, 'profile', id].join('/')
};
