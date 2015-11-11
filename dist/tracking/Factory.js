var LrsRepository = require('./TinCanLrsRepository');
var WebRepository = require('./CheerioWebRepository');
var Service = require('./Service');
module.exports = function (lrs_config) {
    var lrs_repo = new LrsRepository(lrs_config);
    var web_repo = new WebRepository();
    return new Service(lrs_repo, web_repo);
};
//# sourceMappingURL=Factory.js.map