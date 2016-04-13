"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseKnexRepository_1 = require('../../BaseKnexRepository');
var Repository = (function (_super) {
    __extends(Repository, _super);
    function Repository() {
        _super.apply(this, arguments);
    }
    Repository.prototype.createToken = function (token) {
        return this.connect().insert(token, 'id').then(function (ids) {
            return {
                id: ids[0],
                value: token.value,
                user_id: token.user_id,
                expiry: token.expiry
            };
        });
    };
    Repository.prototype.getTokenByValue = function (value) {
        return this.connect().where('value', value).first().then(function (token) {
            if (!token) {
                throw new Error('No token. Log out and log back in.');
            }
            else {
                return token;
            }
        });
    };
    return Repository;
}(BaseKnexRepository_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Repository;

//# sourceMappingURL=KnexRepository.js.map
