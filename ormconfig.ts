import { DataSource } from 'typeorm';
import { env } from './src/app/config/env.ts';

export const AppDataSource = new DataSource({
  name: 'default',
  type: 'mysql',
  host: 'localhost',
  port: parseInt(env.mysql.port, 10),
  username: env.mysql.username,
  password: env.mysql.password,
  database: env.mysql.database,
  synchronize: false,
  logging: false,
  entities: ['./src/app/models/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  subscribers: [],
});
