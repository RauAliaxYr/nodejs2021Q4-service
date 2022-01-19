import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv'
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, '../.env')
});
let port = 5432;
const envPort = process.env['ORM_PORT'];
if(envPort && !isNaN(parseInt(envPort))) port = parseInt(envPort);

export const config: ConnectionOptions = {
  type: 'postgres',
  migrationsRun: true,
  host: "postgres",
  port,
  username: process.env['ORM_USERNAME'] || 'postgres',
  password: process.env['ORM_PASSWORD'] || 'postgres',
  database: process.env['ORM_DATABASE'] || 'postgres',
  synchronize: process.env['ORM_SYNCHRONIZE'] === 'false',
  logging: false,
  entities: ['./src/entities/**/*.ts'],
  migrations: ['./src/migrations/**/*.ts'],
  cli: {
    entitiesDir: './src/entities',
    migrationsDir: './src/migrations',
  },
};

