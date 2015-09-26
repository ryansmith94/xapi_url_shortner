/// <reference path="./definitions/references.d.ts" />
var dotenv = require('dotenv');
dotenv.load();
module.exports = {
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
        password: process.env.LRS_PASSWORD //'bc7e0a2edd5d1969b6d774e679d4eb4e7a35be13'
    }
};
//# sourceMappingURL=config.js.map