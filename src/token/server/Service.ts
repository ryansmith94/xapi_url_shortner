import BaseService = require('../BaseService');
import q = require('q');

var EXPIRY_TIME = 120; // Minutes.
class Service extends BaseService {
  private user_service;

  public setUserService(user_service) {
    this.user_service = user_service
  }

  public createToken(email: string, password: string) {
    var deferred = q.defer();

    this.user_service.getUserByEmailAndPassword(email, password).then(function (user) {
      var expiry = new Date();
      expiry.setMinutes(expiry.getMinutes() + EXPIRY_TIME);

      return this.repo.createToken({
        value: Math.random().toString(36).substr(2),
        user_id: user.id,
        expiry: expiry.toISOString()
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
      if ((new Date()).toISOString() < token.expiry) {
        return this.user_service.getUserById(token.user_id);
      } else {
        throw new Error('No token. Log out and log back in.');
      }
    }.bind(this));
  }
}

export = Service;