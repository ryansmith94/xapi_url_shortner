var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseRepository = require('../../BaseKnexRepository');
var Repository = (function (_super) {
    __extends(Repository, _super);
    function Repository(config, collection) {
        _super.call(this, config, collection);
    }
    Repository.prototype.constructSchema = function (table) {
        table.increments('id').primary();
        table.string('value').notNullable().unique();
        table.integer('user_id').notNullable();
    };
    Repository.prototype.createToken = function (token) {
        delete token.email;
        delete token.password;
        return this.connect().insert(token, 'id').then(function (ids) {
            return {
                id: ids[0],
                value: token.value,
                user_id: token.user_id
            };
        });
    };
    Repository.prototype.getTokenByValue = function (value) {
        return this.connect().where('value', value).first().then(function (token) {
            if (!token) {
                throw new Error('No token');
            }
            else {
                return token;
            }
        });
    };
    return Repository;
})(BaseRepository);
module.exports = Repository;
//# sourceMappingURL=KnexRepository.js.map