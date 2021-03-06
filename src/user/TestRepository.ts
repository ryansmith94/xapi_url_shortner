import * as q from 'q';

class Repository {
  private users: Array<any> = [];

  public createUser(user) {
    user.id = this.users.length + 1;
    this.users.push(user);
    return q(user);
  }

  public getUserByEmail(email: string) {
    var deferred = q.defer();
    var filtered_users = this.users.filter(function (user) {
      return user.email === email;
    });

    if (filtered_users.length > 0) {
      deferred.resolve(filtered_users[0]);
    } else {
      deferred.reject(new Error('No user'));
    }

    return deferred.promise;
  }

  public getUserById(id) {
    var deferred = q.defer();
    var filtered_users = this.users.filter(function (user) {
      return user.id === id;
    });

    if (filtered_users.length > 0) {
      deferred.resolve(filtered_users[0]);
    } else {
      deferred.reject(new Error('No user'));
    }

    return deferred.promise;
  }

  public deleteUserById(id) {
    var deferred = q.defer();
    var filtered_users = this.users.filter(function (user, index) {
      user.index = index;
      return user.id === id;
    });

    if (filtered_users.length > 0) {
      this.users = this.users.slice(0, filtered_users[0].index).concat(
        this.users.slice(filtered_users[0].index + 1)
      );
      deferred.resolve(true);
    } else {
      deferred.reject(new Error('No user'));
    }

    return deferred.promise;
  }

  public getUsersByGroupId(group_id) {
    var deferred = q.defer();
    var filtered_users = this.users.filter(function (user) {
      return user.group_id === group_id;
    });

    deferred.resolve(filtered_users);
    return deferred.promise;
  }

  public deleteUsersByGroupId(group_id) {
    var deferred = q.defer();
    this.users = this.users.filter(function (user) {
      return user.group_id !== group_id;
    });

    deferred.resolve(true);
    return deferred.promise;
  }

  public updateUserById(id, user) {
    var deferred = q.defer();
    this.users = this.users.map((stored_user) => {
      if (stored_user.id === id) {
        return user;
      } else {
        return stored_user;
      }
    });

    deferred.resolve(user);
    return deferred.promise;
  }
}

export default Repository;