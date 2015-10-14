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

  private validateEmail(email: string) {
    var deferred = q.defer();
    var email_regex = /^[A-Z0-9.\'_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!email_regex.test(email)) {
      deferred.reject(new Error('Invalid email'));
    } else {
      deferred.resolve(true);
    }

    return deferred.promise;
  }

  private validateGroupId(group_id) {
    return this.group_service.getGroupById(group_id).then(function (group) {
      return group;
    }.bind(this), function (err) {
      throw new Error('Group does not exist.');
    });
  }

  private validateCreateUser(email: string, password: string, group_id) {
    return this.validateEmail(email).then(function () {
      return this.validateGroupId(group_id);
    }.bind(this)).then(function (group) {
      return this.getUserByEmail(email).then(function (user) {
        if (user.group_id == group_id) {
          throw new Error('Email already exists in the group.');
        } else {
          throw new Error('Email already exists in another group.');
        }
      }, function (err) {
        return true;
      });
    }.bind(this));
  }

  private validateUser(email: string, group_id) {
    return this.validateEmail(email).then(function () {
      return this.validateGroupId(group_id);
    }.bind(this));
  }

  public createUser(email: string, password: string, group_id) {
    return this.validateCreateUser(email, password, group_id).then(function () {
      return this.repo.createUser({
        email: email,
        password: password,
        group_id: group_id
      });
    }.bind(this));
  }

  public deleteUserById(id) {
    return this.repo.deleteUserById(id);
  }

  public getUserByEmailAndPassword(email: string, password: string) {
    return this.repo.getUserByEmailAndPassword(email, password);
  }

  public getUserById(id) {
    return this.repo.getUserById(id);
  }

  private getUserByEmail(email: string) {
    return this.repo.getUserByEmail(email);
  }
}

export = Service;