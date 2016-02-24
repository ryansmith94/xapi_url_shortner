"use strict";
var knex = require('knex');
var config_1 = require('./config');
var Repository = (function () {
    function Repository(config, collection) {
        this.config = config;
        this.collection = collection;
        this.constructTable();
    }
    Repository.prototype.constructTable = function () {
        return knex(this.config).schema.hasTable(this.collection).then(function (exists) {
            if (exists) {
                return knex(this.config).schema.table(this.collection, this.constructSchema);
            }
            else {
                return knex(this.config).schema.createTable(this.collection, this.constructSchema);
            }
        }.bind(this)).then(this.logSuccess, this.logError);
    };
    Repository.prototype.logSuccess = function () {
        if (config_1.default.debug)
            console.log('Success', arguments);
    };
    Repository.prototype.logError = function (err) {
        if (config_1.default.debug)
            console.error('Error', err);
    };
    Repository.prototype.constructSchema = function (table) { };
    Repository.prototype.connect = function () {
        return knex(this.config)(this.collection);
    };
    return Repository;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Repository;

//# sourceMappingURL=BaseKnexRepository.js.map
