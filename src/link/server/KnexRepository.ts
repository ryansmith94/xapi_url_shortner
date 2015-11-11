import BaseRepository = require('../../BaseKnexRepository');

class Repository extends BaseRepository {

  public constructor(config, collection) {
    super(config, collection);
  }

  protected constructSchema(table) {
    table.increments('id').primary();
    table.string('long_url').notNullable();
    table.string('short_url').unique();
    table.string('group_id').notNullable();
    table.string('user_id').notNullable();
  }

  public createLink(link) {
    return this.connect().insert(link, 'id').then(function (ids) {
      link.id = ids[0];
      return link;
    });
  }

  public updateLink(link) {
    return this.connect().where('id', link.id).update(link).then(function () {
      return link;
    });
  }

  public getLinkById(id) {
    return this.connect().where('id', id).first().then(function (link) {
      if (!link) {
        throw new Error('No link');
      } else {
        return link;
      }
    });
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

  public getLinksByGroupId(group_id) {
    return this.connect().where('group_id', group_id);
  }

  public deleteLinkById(id) {
    return this.connect().where('id', id).delete().then(function (link) {
      if (!link) {
        throw new Error('No link');
      } else {
        return link;
      }
    });
  }

  public deleteLinksByGroupId(group_id) {
    return this.connect().where('group_id', group_id).delete().then(function() {
      return true;
    });
  }
}

export = Repository;