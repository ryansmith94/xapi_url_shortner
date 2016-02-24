"use strict";
var KnexRepository_1 = require('./KnexRepository');
var Service_1 = require('./Service');
function default_1(knex_config, collection) {
    var repo = new KnexRepository_1.default(knex_config, collection);
    return new Service_1.default(repo);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;

//# sourceMappingURL=Factory.js.map
