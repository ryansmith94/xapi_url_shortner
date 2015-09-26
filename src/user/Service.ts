import BaseService = require('../BaseService');
import q = require('q');

class Service extends BaseService {
  private repo;
  private group_service;

  public constructor(repository, group_service) {
    this.repo = repository;
    this.group_service = group_service;
    super();
  }

  private validateUser(email: string, password: string, group_id) {
    var deferred = q.defer();
    var email_regex = /^[A-Z0-9.\'_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!email_regex.test(email)) {
      deferred.reject(new Error('Invalid email'));
    }

    this.group_service.getGroupById(group_id).then(function (group) {
      this.getUserByEmail(email).then(function (user) {
        if (user.group_id == group_id) {
          deferred.reject(new Error('Email already exists in the group.'));
        } else {
          deferred.reject(new Error('Email already exists in another group.'));
        }
      }, function (err) {
        deferred.resolve(true);
      });
    }.bind(this), function (err) {
      deferred.reject(new Error('Group does not exist.'));
    });

    return deferred.promise;
  }

  public createUser(email: string, password: string, group_id) {
    return this.validateUser(email, password, group_id).then(function () {
      return this.repo.createUser({
        email: email,
        password: password,
        group_id: group_id
      });
    }.bind(this));
  }

  private getUserByEmail(email: string) {
    return this.repo.getUserByEmail(email);
  }
}

export = Service;