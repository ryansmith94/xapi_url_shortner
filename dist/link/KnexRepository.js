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
        table.string('long_url').notNullable();
        table.string('short_url').unique();
    };
    Repository.prototype.createLink = function (link) {
        return this.connect().insert(link, 'id').then(function (ids) {
            return {
                id: ids[0],
                long_url: link.long_url,
                short_url: link.short_url
            };
        });
    };
    Repository.prototype.updateLink = function (link) {
        return this.connect().where('id', link.id).update(link).then(function () {
            return link;
        });
    };
    Repository.prototype.getLinkById = function (id) {
        return this.connect().where('id', id).first().then(function (link) {
            if (!link) {
                throw new Error('No link');
            }
            else {
                return link;
            }
        });
    };
    Repository.prototype.getCustomLinkByShortUrl = function (short_url) {
        return this.connect().where('short_url', short_url).first().then(function (link) {
            if (!link) {
                throw new Error('No link');
            }
            else {
                return link;
            }
        });
    };
    Repository.prototype.getLinks = function () {
        return this.connect().select();
    };
    return Repository;
})(BaseRepository);
module.exports = Repository;
//# sourceMappingURL=KnexRepository.js.map