// @ts-check

import path from 'path';
import Pug from 'pug';
import socket from 'socket.io';
import fastify from 'fastify';
import pointOfView from 'point-of-view';
import fastifyStatic from '@fastify/static';
import _ from 'lodash';
import addRoutes from './routes.js';
import mongoose from 'mongoose'
import { async } from 'regenerator-runtime';

const isProduction = process.env.NODE_ENV === 'production';
const appPath = path.join(__dirname, '..');
const isDevelopment = !isProduction;

const setUpViews = (app) => {
  const domain = isDevelopment ? 'http://localhost:8080' : '';
  app.register(pointOfView, {
    engine: {
      pug: Pug,
    },
    defaultContext: {
      assetPath: (filename) => `${domain}/assets/${filename}`,
    },
    templates: path.join(__dirname, 'views'),
  });
};

const setUpStaticAssets = (app) => {
  app.register(fastifyStatic, {
    root: path.join(appPath, 'dist/public'),
    prefix: '/assets',
  });
};

const setCookies = ( app ) => {
  app.register(require('@fastify/cookie'),)
}

const connect = async () => {
  try{
  await mongoose.connect(`mongodb+srv://Admin:CatSam@chat.lzcnnbm.mongodb.net/?retryWrites=true&w=majority`)
  console.log('Mongo connnected')
  } catch(e){
    console.error(e)
  }
}

connect()

export default (state = {}) => {
  const app = fastify();

  setUpViews(app);
  setCookies(app)
  setUpStaticAssets(app);

  const io = socket(app.server);
  addRoutes(app, io, state);

  return app;
};