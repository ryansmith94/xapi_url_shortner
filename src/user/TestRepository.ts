/// <reference path="../definitions/references.d.ts" />
import q = require('q');

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
}

export = Repository;