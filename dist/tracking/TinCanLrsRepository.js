"use strict";
var Tincan = require('tincanjs');
var q = require('q');
var Repository = (function () {
    function Repository(config) {
        this.config = config;
    }
    Repository.prototype.connect = function () {
        return new Tincan({ recordStores: [this.config] });
    };
    Repository.prototype.createStatement = function (statement) {
        var deferred = q.defer();
        this.connect().sendStatement(statement, function (responses) {
            if (!responses)
                deferred.reject(new Error('No LRSs configured.'));
            var err_res = responses.filter(function (response) {
                return response.err;
            })[0];
            if (err_res && err_res.err)
                deferred.reject(err_res.err);
            deferred.resolve(statement);
        });
        return deferred.promise;
    };
    return Repository;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Repository;

//# sourceMappingURL=TincanLrsRepository.js.map
