import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});


export const {PORT} = process.env;
export const {NODE_ENV} = process.env;
export const {MONGO_CONNECTION_STRING} = process.env;
export const {JWT_SECRET_KEY} = process.env;
export const AUTH_MODE = process.env.AUTH_MODE === 'true';
export const {LOG_STATUS}= process.env
export const {TYPEORM_CONNECTION}= process.env
export const {TYPEORM_HOST}= process.env
export const {TYPEORM_USERNAME}= process.env
export const {TYPEORM_PASSWORD}= process.env
export const {TYPEORM_DATABASE}= process.env
export const {TYPEORM_PORT}= process.env
export const {TYPEORM_SYNCHRONIZE}= process.env
export const {TYPEORM_LOGGING}= process.env
export const {TYPEORM_ENTITIES}= process.env
export const {TYPEORM_MIGRATIONS}= process.env
export const {TYPEORM_SUBSCRIBERS}= process.env





