import * as dotenv from 'dotenv';
dotenv.load();

export default {
  knex: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    }
  },
  lrs: {
    endpoint: process.env.LRS_ENDPOINT,
    username: process.env.LRS_USERNAME,
    password: process.env.LRS_PASSWORD
  },
  debug: process.env.APP_DEBUG === 'true',
  port: parseInt(process.env.APP_PORT)
};
