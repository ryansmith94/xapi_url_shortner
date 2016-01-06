var q = require('q');
var Repository = (function () {
    function Repository() {
    }
    Repository.prototype.getTitle = function (url) {
        return q(url);
    };
    return Repository;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Repository;
//# sourceMappingURL=TestWebRepository.js.map