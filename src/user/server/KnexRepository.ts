import BaseRepository from '../../BaseKnexRepository';

class Repository extends BaseRepository {

  public constructor(config, collection) {
    super(config, collection);
  }

  protected constructSchema(table) {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.integer('group_id').notNullable();
    table.boolean('admin').notNullable();
  }

  public createUser(user) {
    return this.connect().insert(user, 'id').then(function (ids) {
      return {
        id: ids[0],
        email: user.email,
        password: user.password,
        group_id: user.group_id,
        admin: user.admin
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

  public deleteUsersByGroupId(group_id) {
    return this.connect().where('group_id', group_id).delete().then(function () {
      return true;
    });
  }

  public updateUserById(id, user) {
    return this.connect().where('id', id).update(user).then((ids) => {
      if (ids === 0) throw new Error('No user');
      return user;
    });
  }
}

export default Repository;