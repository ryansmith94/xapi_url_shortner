/// <reference path="../definitions/references.d.ts" />
var knex = require('knex');
var Repository = (function () {
    function Repository(connection, collection) {
        this.connection = connection;
        this.collection = collection;
    }
    Repository.prototype.connect = function () {
        return knex(this.connection)(this.collection);
    };
    Repository.prototype.createLink = function (link) {
        return this.connect().insert(link, 'id').then(function (ids) {
            return {
                id: ids[0],
                long_url: link.long_url
            };
        });
    };
    Repository.prototype.getLinkById = function (id) {
        return this.connect().where('id', id).first();
    };
    return Repository;
})();
module.exports = Repository;
