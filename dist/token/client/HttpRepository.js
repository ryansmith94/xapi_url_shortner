var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../definitions/references.d.ts" />
var BaseRepository = require('../../BaseHttpRepository');
var Repository = (function (_super) {
    __extends(Repository, _super);
    function Repository(endpoint) {
        _super.call(this, endpoint);
        this.tokens = [];
    }
    Repository.prototype.createToken = function (token) {
        return this.connect({
            method: 'POST',
            data: token
        }).then(function (token) {
            this.tokens.push(token);
            return token;
        }.bind(this));
    };
    Repository.prototype.getTokenByValue = function (value) {
        return this.filterModels(this.tokens, function (token) {
            return token.value === value;
        });
    };
    return Repository;
})(BaseRepository);
module.exports = Repository;
//# sourceMappingURL=HttpRepository.js.map