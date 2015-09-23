/// <reference path="./definitions/references.d.ts" />
import knex = require('knex');

class Repository {
  private config;
  private collection;

  public constructor(config, collection) {
    this.config = config;
    this.collection = collection;
    this.constructTable();
  }

  private constructTable() {
    knex(this.config).schema.hasTable(this.collection).then(function (exists) {
      if (exists) {
        return knex(this.config).schema.table(this.collection, this.constructSchema);
      } else {
        return knex(this.config).schema.createTable(this.collection, this.constructSchema)
      }
    }.bind(this)).then(this.logSuccess, this.logError);
  }

  private logSuccess() {
    console.log('Success', arguments);
  }

  private logError(err) {
    console.error('Error', err);
  }

  protected constructSchema(table) {}

  protected connect() {
    return knex(this.config)(this.collection);
  }
}

export = Repository;