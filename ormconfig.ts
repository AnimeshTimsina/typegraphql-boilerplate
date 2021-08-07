import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_USER,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DEV_DB,
  PROD_DB,
  NODE_ENV,
} = process.env;

const dir = NODE_ENV === 'production' ? 'build' : 'src';

const config: ConnectionOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: NODE_ENV === 'production' ? PROD_DB : DEV_DB,
  synchronize: NODE_ENV === 'production' ? false : true,
  logging: false,
  entities: [`${dir}/models/entity/**/*.{ts,js}`],
  migrations: [`${dir}/models/migrations/**/*.{ts,js}`],
  subscribers: [`${dir}/models/subscriber/**/*.{ts,js}`],
  cli: {
    migrationsDir: `${dir}/models/migrations`,
    entitiesDir: `${dir}/models/entity`,
    subscribersDir: `${dir}/models/subscriber`,
  },
};

export = config;