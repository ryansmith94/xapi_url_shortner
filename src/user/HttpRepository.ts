/// <reference path="../definitions/references.d.ts" />
import q = require('q');

class Repository {

  public createUser(user) {
    return q(user);
  }

  public getUserByEmail(email: string) {
    var deferred = q.defer();
    deferred.resolve({
      email: email
    });
    return deferred.promise;
  }

  public getUserByEmailAndPassword(email: string, password: string) {
    var deferred = q.defer();
    deferred.resolve({
      email: email,
      password: password
    });
    return deferred.promise;
  }

  public getUserById(id) {
    var deferred = q.defer();
    deferred.resolve({
      id: id
    });
    return deferred.promise;
  }
}

export = Repository;