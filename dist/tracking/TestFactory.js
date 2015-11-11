var LrsRepository = require('./TestLrsRepository');
var WebRepository = require('./TestWebRepository');
var Service = require('./Service');
module.exports = function () {
    var lrs_repo = new LrsRepository();
    var web_repo = new WebRepository();
    return new Service(lrs_repo, web_repo);
};
//# sourceMappingURL=TestFactory.js.map