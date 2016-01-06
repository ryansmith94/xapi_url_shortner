var q = require('q');
var Repository = (function () {
    function Repository() {
        this.tokens = [];
    }
    Repository.prototype.createToken = function (token_request) {
        var token = {
            id: this.tokens.length + 1,
            value: '' + (this.tokens.length + 1),
            user_id: token_request.email + token_request.password
        };
        this.tokens.push(token);
        return q(token);
    };
    return Repository;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Repository;
//# sourceMappingURL=TestRepository.js.map