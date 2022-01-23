import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv'
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const envPort = process.env['POSTGRES_PORT'];
let port = 5432;
if(envPort && !isNaN(parseInt(envPort))) port = parseInt(envPort);

const config: ConnectionOptions = {
  type: 'postgres',
  synchronize: false,
  migrationsRun: true,
  host: "postgres",
  port,
  username: process.env['POSTGRES_USER'] || 'postgres',
  password: process.env['POSTGRES_PASSWORD'] || 'admin',
  database: 'postgres',
  logging: false,
  entities: ['./src/entities/**/*.ts'],
  migrations: ['./src/migrations/**/*.ts'],
  cli: {
    entitiesDir: './src/entities',
    migrationsDir: './src/migrations',
  },
};

export default config;