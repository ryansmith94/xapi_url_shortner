var TinCanLrsRepository_1 = require('./TinCanLrsRepository');
var CheerioWebRepository_1 = require('./CheerioWebRepository');
var Service_1 = require('./Service');
function default_1(lrs_config) {
    var lrs_repo = new TinCanLrsRepository_1.default(lrs_config);
    var web_repo = new CheerioWebRepository_1.default();
    return new Service_1.default(lrs_repo, web_repo);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
//# sourceMappingURL=Factory.js.map