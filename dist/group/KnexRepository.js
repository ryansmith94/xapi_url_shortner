"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseKnexRepository_1 = require('../BaseKnexRepository');
var Repository = (function (_super) {
    __extends(Repository, _super);
    function Repository(config, collection) {
        _super.call(this, config, collection);
    }
    Repository.prototype.constructSchema = function (table) {
        table.increments('id').primary();
        table.string('name');
        table.string('verb_id');
        table.string('verb_lang');
        table.string('verb_display');
    };
    Repository.prototype.createGroup = function (group) {
        return this.connect().insert(group, 'id').then(function (ids) {
            return {
                id: ids[0],
                name: group.name,
                verb_id: group.verb_id,
                verb_lang: group.verb_lang,
                verb_display: group.verb_display
            };
        });
    };
    Repository.prototype.getGroupById = function (id) {
        return this.connect().where('id', id).first().then(function (group) {
            if (!group) {
                throw new Error('No group');
            }
            else {
                return group;
            }
        });
    };
    Repository.prototype.getGroups = function () {
        return this.connect().select();
    };
    Repository.prototype.deleteGroupById = function (id) {
        return this.connect().where('id', id).delete().then(function (group) {
            if (!group) {
                throw new Error('No group');
            }
            else {
                return true;
            }
        });
    };
    return Repository;
}(BaseKnexRepository_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Repository;

//# sourceMappingURL=KnexRepository.js.map
