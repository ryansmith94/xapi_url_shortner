var TestLrsRepository_1 = require('./TestLrsRepository');
var TestWebRepository_1 = require('./TestWebRepository');
var Service_1 = require('./Service');
function default_1() {
    var lrs_repo = new TestLrsRepository_1.default();
    var web_repo = new TestWebRepository_1.default();
    return new Service_1.default(lrs_repo, web_repo);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
//# sourceMappingURL=TestFactory.js.map