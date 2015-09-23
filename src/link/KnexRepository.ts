import BaseRepository = require('../BaseKnexRepository');

class Repository extends BaseRepository {

  public constructor(config, collection) {
    super(config, collection);
  }

  protected constructSchema(table) {
    table.increments('id').primary();
    table.string('long_url').notNullable();
    table.string('short_url').unique();
  }

  public createLink(link) {
    return this.connect().insert(link, 'id').then(function (ids) {
      return {
        id: ids[0],
        long_url: link.long_url,
        short_url: link.short_url
      };
    });
  }

  public updateLink(link) {
    return this.connect().where('id', link.id).update(link).then(function () {
      return link;
    });
  }

  public getLinkById(id) {
    return this.connect().where('id', id).first();
  }

  public getCustomLinkByShortUrl(short_url: string) {
    return this.connect().where('short_url', short_url).first().then(function (link) {
      if (!link) {
        throw new Error('No link');
      } else {
        return link;
      }
    });
  }

  public getLinks() {
    return this.connect().select();
  }
}

export = Repository;