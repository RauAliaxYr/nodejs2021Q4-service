import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});


export const {PORT} = process.env;
export const {NODE_ENV} = process.env;
export const {MONGO_CONNECTION_STRING} = process.env;
export const {JWT_SECRET_KEY = 'default'} = process.env;
export const AUTH_MODE = process.env.AUTH_MODE === 'true';
export const {LOG_STATUS}= process.env
export const {ORM_CONNECTION}= process.env
export const {ORM_HOST}= process.env
export const {ORM_USERNAME}= process.env
export const {ORM_PASSWORD}= process.env
export const {ORM_DATABASE}= process.env
export const {ORM_PORT}= process.env
export const {ORM_SYNCHRONIZE}= process.env
export const {ORM_LOGGING}= process.env
export const {ORM_ENTITIES}= process.env
export const {ORM_MIGRATIONS}= process.env
export const {ORM_SUBSCRIBERS}= process.env





