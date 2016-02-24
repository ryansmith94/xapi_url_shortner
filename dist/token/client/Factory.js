"use strict";
var HttpRepository_1 = require('./HttpRepository');
var Service_1 = require('./Service');
function default_1(endpoint) {
    var repo = new HttpRepository_1.default(endpoint);
    return new Service_1.default(repo);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;

//# sourceMappingURL=Factory.js.map
