/// <reference path="./definitions/references.d.ts" />
import dotenv = require('dotenv');
dotenv.load();

export = {
  knex: {
    client: process.env.DB_CLIENT, //'mysql',
    connection: {
      host: process.env.DB_HOST, //'127.0.0.1',
      user: process.env.DB_USERNAME, //'root',
      password: process.env.DB_PASSWORD, //'mysql',
      database: process.env.DB_NAME, //'shortener'
    }
  },
  lrs: {
    endpoint: process.env.LRS_ENDPOINT, //'http://demo.learninglocker.net/data/xAPI',
    username: process.env.LRS_USERNAME, //'d416e6220812740d3922eb09813ebb4163e8eb3e',
    password: process.env.LRS_PASSWORD //'bc7e0a2edd5d1969b6d774e679d4eb4e7a35be13'
  }
}