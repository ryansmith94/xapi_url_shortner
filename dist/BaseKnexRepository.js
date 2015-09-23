/// <reference path="./definitions/references.d.ts" />
var knex = require('knex');
var Repository = (function () {
    function Repository(config, collection) {
        this.config = config;
        this.collection = collection;
        this.constructTable();
    }
    Repository.prototype.constructTable = function () {
        knex(this.config).schema.hasTable(this.collection).then(function (exists) {
            if (exists) {
                return knex(this.config).schema.table(this.collection, this.constructSchema);
            }
            else {
                return knex(this.config).schema.createTable(this.collection, this.constructSchema);
            }
        }.bind(this)).then(this.logSuccess, this.logError);
    };
    Repository.prototype.logSuccess = function () {
        console.log('Success', arguments);
    };
    Repository.prototype.logError = function (err) {
        console.error('Error', err);
    };
    Repository.prototype.constructSchema = function (table) { };
    Repository.prototype.connect = function () {
        return knex(this.config)(this.collection);
    };
    return Repository;
})();
module.exports = Repository;
//# sourceMappingURL=BaseKnexRepository.js.map