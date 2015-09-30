/// <reference path="../definitions/references.d.ts" />
var jquery = require('jquery');
var q = require('q');
var Repository = (function () {
    function Repository(endpoint) {
        this.tokens = [];
        this.endpoint = endpoint;
    }
    Repository.prototype.createToken = function (token) {
        return jquery.ajax({
            url: this.endpoint,
            dataType: 'json',
            method: 'POST',
            data: token
        }).then(function (token) {
            this.tokens.push(token);
            return token;
        }.bind(this));
    };
    Repository.prototype.getTokenByValue = function (value) {
        var deferred = q.defer();
        var filtered_tokens = this.tokens.filter(function (token) {
            return token.value === value;
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
})();
module.exports = Repository;
//# sourceMappingURL=HttpRepository.js.map