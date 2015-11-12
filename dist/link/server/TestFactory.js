var Repository = require('../TestRepository');
var Service = require('./Service');
module.exports = function () {
    var repo = new Repository();
    return new Service(repo);
};
//# sourceMappingURL=TestFactory.js.map