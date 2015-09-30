import BaseService = require('../BaseService');
import q = require('q');

class Service extends BaseService {
  private repo;
  private user_service;

  public constructor(repository, user_service) {
    this.repo = repository;
    this.user_service = user_service;
    super();
  }

  public createToken(email: string, password: string) {
    var deferred = q.defer();

    this.user_service.getUserByEmailAndPassword(email, password).then(function (user) {
      return this.repo.createToken({
        value: Math.random().toString(36).substr(2),
        user_id: user.id
      }).then(function (token) {
        return deferred.resolve(token);
      });
    }.bind(this)).then(function (err) {
      deferred.reject(err);
    }, function (err) {
      deferred.reject(err);
    });

    return deferred.promise;
  }

  public getUserByValue(token_value: string) {
    return this.repo.getTokenByValue(token_value).then(function (token) {
      return this.user_service.getUserById(token.user_id);
    }.bind(this));
  }
}

export = Service;