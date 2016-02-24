"use strict";
var dotenv = require('dotenv');
dotenv.load();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
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

//# sourceMappingURL=config.js.map
