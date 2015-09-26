import BaseRepository = require('../BaseKnexRepository');

class Repository extends BaseRepository {

  public constructor(config, collection) {
    super(config, collection);
  }

  protected constructSchema(table) {
    table.increments('id').primary();
    table.string('name');
  }

  public createGroup(group) {
    return this.connect().insert(group, 'id').then(function (ids) {
      return {
        id: ids[0],
        name: group.name
      };
    });
  }
}

export = Repository;