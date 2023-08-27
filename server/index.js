// @ts-check

import path from 'path';
import Pug from 'pug';
import socket from 'socket.io';
import fastify from 'fastify';
import pointOfView from 'point-of-view';
import fastifyStatic from '@fastify/static';
import fastifyMultipart from '@fastify/multipart'
import _ from 'lodash';
import addRoutes from './routes.js';
import mongoose from 'mongoose'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import s3 from './aws'

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

const setMultipart = (app) => {
  app.register(fastifyMultipart, { attachFieldsToBody: true, limits: {fileSize: 5 * 1000000} })
}
const setCors = (app) => {
  app.register(cors, {
    allowedHeaders: ['Authorization']
  })
}
console.log(dotenv.config().parse)
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
  setMultipart(app)
  setCors(app)

  const io = socket(app.server);
  addRoutes(app, io, s3, state);

  return app;
};
