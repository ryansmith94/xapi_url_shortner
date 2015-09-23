/// <reference path="../definitions/references.d.ts" />
import knex = require('knex');

class Repository {
  private config;
  private collection;

  public constructor(config, collection) {
    this.config = config;
    this.collection = collection;
  }

  private connect() {
    return knex(this.config)(this.collection);
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

  public getLinkById(id) {
    return this.connect().where('id', id).first();
  }

  public getLinks() {
    return this.connect().select();
  }
}

export = Repository;