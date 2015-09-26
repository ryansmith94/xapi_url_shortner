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

  public getGroupById(id) {
    return this.connect().where('id', id).first().then(function (group) {
      if (!group) {
        throw new Error('No group');
      } else {
        return group;
      }
    });
  }
}

export = Repository;