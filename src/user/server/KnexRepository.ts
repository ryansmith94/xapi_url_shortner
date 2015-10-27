import BaseRepository = require('../../BaseKnexRepository');

class Repository extends BaseRepository {

  public constructor(config, collection) {
    super(config, collection);
  }

  protected constructSchema(table) {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.integer('group_id').notNullable();
  }

  public createUser(user) {
    return this.connect().insert(user, 'id').then(function (ids) {
      return {
        id: ids[0],
        email: user.email,
        password: user.password,
        group_id: user.group_id
      };
    });
  }

  public getUserByEmail(email: string) {
    return this.connect().where('email', email).first().then(function (user) {
      if (!user) {
        throw new Error('No user');
      } else {
        return user;
      }
    });
  }

  public getUserById(id) {
    return this.connect().where('id', id).first().then(function (user) {
      if (!user) {
        throw new Error('No user');
      } else {
        return user;
      }
    });
  }

  public deleteUserById(id) {
    return this.connect().where('id', id).delete().then(function (user) {
      if (!user) {
        throw new Error('No user');
      } else {
        return user;
      }
    });
  }

  public getUsersByGroupId(group_id) {
    return this.connect().where('group_id', group_id);
  }
}

export = Repository;