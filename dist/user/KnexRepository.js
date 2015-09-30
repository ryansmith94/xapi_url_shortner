var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseRepository = require('../BaseKnexRepository');
var Repository = (function (_super) {
    __extends(Repository, _super);
    function Repository(config, collection) {
        _super.call(this, config, collection);
    }
    Repository.prototype.constructSchema = function (table) {
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.integer('group_id').notNullable();
    };
    Repository.prototype.createUser = function (user) {
        return this.connect().insert(user, 'id').then(function (ids) {
            return {
                id: ids[0],
                email: user.email,
                password: user.password,
                group_id: user.group_id
            };
        });
    };
    Repository.prototype.getUserByEmail = function (email) {
        return this.connect().where('email', email).first().then(function (user) {
            if (!user) {
                throw new Error('No user');
            }
            else {
                return user;
            }
        });
    };
    return Repository;
})(BaseRepository);
module.exports = Repository;
//# sourceMappingURL=KnexRepository.js.map