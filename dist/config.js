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
        password: process.env.LRS_PASSWORD
    }
};
//# sourceMappingURL=config.js.map