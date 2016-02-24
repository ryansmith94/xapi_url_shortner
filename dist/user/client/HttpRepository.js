"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseHttpRepository_1 = require('../../BaseHttpRepository');
var Repository = (function (_super) {
    __extends(Repository, _super);
    function Repository(endpoint, token_value) {
        _super.call(this, endpoint);
        this.token_value = token_value;
    }
    Repository.prototype.connect = function (opts) {
        opts.beforeSend = function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + this.token_value);
        }.bind(this);
        return _super.prototype.connect.call(this, opts);
    };
    Repository.prototype.createUser = function (user) {
        return this.connect({
            method: 'POST',
            data: user
        });
    };
    return Repository;
}(BaseHttpRepository_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Repository;

//# sourceMappingURL=HttpRepository.js.map
