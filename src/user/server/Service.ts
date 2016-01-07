import BaseService from '../BaseService';
import * as q from 'q';
import * as passhash from 'password-hash';

class Service extends BaseService {
  private group_service;

  public setGroupService(group_service) {
    this.group_service = group_service;
  }

  private validateGroupId(group_id) {
    return this.group_service.getGroupById(group_id).then(function (group) {
      return group;
    }.bind(this), function (err) {
      throw new Error('Group does not exist.');
    });
  }

  private validateCreateUser(email: string, password: string, group_id) {
    return this.validateEmail(email).then(() => {
      return this.validateGroupId(group_id);
    }).then((group) => {
      return this.getUserByEmail(email).then((user) => {
        if (user.group_id == group_id) {
          throw new Error('Email already exists in the group.');
        } else {
          throw new Error('Email already exists in another group.');
        }
      }, (err) => {
        return true;
      });
    });
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
        password: passhash.generate(password),
        group_id: group_id
      });
    }.bind(this));
  }

  public createUserWithUser(email: string, password: string, user_id: number) {
    return this.getUserById(user_id).then((user) => {
      return this.createUser(email, password, user.group_id);
    });
  }

  public deleteUserById(id) {
    return this.repo.deleteUserById(id);
  }

  public getUserByEmailAndPassword(email: string, password: string) {
    return this.getUserByEmail(email).then(function (user) {
      if (passhash.verify(password, user.password)) {
        return user;
      } else {
        throw new Error('No User with those credentials');
      }
    });
  }

  public getUserById(id) {
    return this.repo.getUserById(id);
  }

  public getUsersByGroupId(group_id) {
    return this.validateGroupId(group_id).then(function () {
      return this.repo.getUsersByGroupId(group_id);
    }.bind(this));
  }

  public deleteUsersByGroupId(group_id) {
    return this.validateGroupId(group_id).then(function() {
      return this.repo.deleteUsersByGroupId(group_id);
    }.bind(this)).then(function () {
      return true;
    }); 
  }

  private getUserByEmail(email: string) {
    return this.repo.getUserByEmail(email);
  }
}

export default Service;