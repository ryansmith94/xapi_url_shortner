var Repository = require('./HttpRepository');
var Service = require('./Service');
module.exports = function (endpoint, token_value) {
    var repo = new Repository(endpoint, token_value);
    return new Service(repo);
};
//# sourceMappingURL=Factory.js.map