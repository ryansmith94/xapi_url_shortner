var q = require('q');
var Repository = (function () {
    function Repository() {
    }
    Repository.prototype.createStatement = function (statement) {
        return q(statement);
    };
    return Repository;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Repository;
//# sourceMappingURL=TestLrsRepository.js.map