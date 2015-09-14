/// <reference path="../definitions/references.d.ts" />
import knex = require('knex');

class Repository {
  private connection;
  private collection;

  public constructor(connection, collection) {
    this.connection = connection;
    this.collection = collection;
  }

  private connect() {
    return knex(this.connection)(this.collection);
  }

  public createLink(link) {
    return this.connect().insert(link, 'id').then(function (ids) {
      return {
        id: ids[0],
        long_url: link.long_url
      };
    });
  }

  public getLinkById(id) {
    return this.connect().where('id', id).first();
  }
}

export = Repository;