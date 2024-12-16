import 'dotenv/config';

const PORT = process.env.PORT!;
const SECRET_KEY = process.env.SECRET_KEY!;

const MYSQL_PORT = process.env.MYSQL_PORT!;
const MYSQL_USERNAME = process.env.MYSQL_USERNAME!;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD!;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE!;

export const env = {
  port: PORT,
  secretKey: SECRET_KEY,
  mysql: {
    port: MYSQL_PORT,
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
  },
};
