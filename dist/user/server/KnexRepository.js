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
    Repository.prototype.getUserByEmailAndPassword = function (email, password) {
        return this.connect().where('email', email).where('password', password).first().then(function (user) {
            if (!user) {
                throw new Error('No user with those credentials');
            }
            else {
                return user;
            }
        });
    };
    Repository.prototype.getUserById = function (id) {
        return this.connect().where('id', id).first().then(function (user) {
            if (!user) {
                throw new Error('No user');
            }
            else {
                return user;
            }
        });
    };
    Repository.prototype.deleteUserById = function (id) {
        return this.connect().where('id', id).delete().then(function (user) {
            if (!user) {
                throw new Error('No user');
            }
            else {
                return user;
            }
        });
    };
    Repository.prototype.getUsersByGroupId = function (group_id) {
        return this.connect().where('group_id', group_id);
    };
    return Repository;
})(BaseRepository);
module.exports = Repository;
//# sourceMappingURL=KnexRepository.js.map