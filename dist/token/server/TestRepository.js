"use strict";
var q = require('q');
var Repository = (function () {
    function Repository() {
        this.tokens = [];
    }
    Repository.prototype.createToken = function (token) {
        token.id = this.tokens.length + 1;
        this.tokens.push(token);
        return q(token);
    };
    Repository.prototype.getTokenByValue = function (token_value) {
        var deferred = q.defer();
        var filtered_tokens = this.tokens.filter(function (token) {
            return token.value === token_value;
        });
        if (filtered_tokens.length > 0) {
            deferred.resolve(filtered_tokens[0]);
        }
        else {
            deferred.reject(new Error('No token'));
        }
        return deferred.promise;
    };
    return Repository;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Repository;

//# sourceMappingURL=TestRepository.js.map
