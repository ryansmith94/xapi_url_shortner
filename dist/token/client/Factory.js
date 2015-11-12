var Repository = require('./HttpRepository');
var Service = require('./Service');
module.exports = function (endpoint) {
    var repo = new Repository(endpoint);
    return new Service(repo);
};
//# sourceMappingURL=Factory.js.map