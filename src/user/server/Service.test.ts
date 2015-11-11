import BaseTest = require('../../BaseTest');
import Service = require('./Service');
import TestRepository = require('../TestRepository');
import GroupService = require('../../group/Service');
import GroupTestRepository = require('../../group/TestRepository');
import UserService = require('../../user/server/Service');
import UserTestRepository = require('../../user/TestRepository');
import TokenService = require('../../token/server/Service');
import TokenTestRepository = require('../../token/server/TestRepository');
import passhash = require('password-hash');

var EMAIL = 'test@example.com';
var PASSWORD = 'password';
var GROUP_NAME = 'Test group';
var GROUP_ID = 1;
class Test extends BaseTest {
  protected name: string = 'user/server/ServiceTest';
  protected service: Service;
  protected group_service: GroupService;
  protected token_service: TokenService;

  public beforeEach() {
    // Initialises services.
    this.group_service = new GroupService(new GroupTestRepository());
    this.token_service = new TokenService(new TokenTestRepository());
    this.service = new Service(new TestRepository());

    // Injects services into services.
    this.service.setGroupService(this.group_service);
    this.service.setTokenService(this.token_service);
    this.token_service.setUserService(this.service);
  }

  private createToken(id = '') {
    var user_email = id+'test@example.com';
    var user_pass = 'test_password';
    var group_name = 'GROUP_NAME';
    return this.group_service.createGroup(group_name).then(function (group) {
      return this.service.createUser(user_email, user_pass, group.id);
    }.bind(this)).then(function (user) {
      return this.token_service.createToken(user_email, user_pass);
    }.bind(this));
  }

  public testCreateUser(assert, done) {
    this.group_service.createGroup(GROUP_NAME).then(function (group: any) {
      return this.service.createUser(EMAIL, PASSWORD, group.id).then(function (user: any) {
        assert.equal(user.email, EMAIL);
        assert.equal(passhash.verify(PASSWORD, user.password), true);
        assert.equal(user.group_id, group.id);
      });
    }.bind(this)).then(done, done);
  }

  public testCreateUserWithInvalidEmail(assert, done) {
    this.group_service.createGroup(GROUP_NAME).then(function (group: any) {
      return this.service.createUser('invalid_email', PASSWORD, group.id).then(function (user) {
        assert.equal(true, false);
      }, function () {
        assert.equal(false, false);
      });
    }.bind(this)).then(done, done);
  }

  public testCreateUserWithInvalidGroupId(assert, done) {
    this.service.createUser(EMAIL, PASSWORD, GROUP_ID).then(function (user) {
      assert.equal(true, false);
    }, function () {
      assert.equal(false, false);
    }).then(done, done);
  }

  public testCreateUserThatExistsInGroup(assert, done) {
    this.group_service.createGroup(GROUP_NAME).then(function (group: any) {
      return this.service.createUser(EMAIL, PASSWORD, group.id).then(function (existing_user) {
        return this.service.createUser(EMAIL, PASSWORD, group.id).then(function (user) {
          assert.equal(true, false);
        }, function () {
          assert.equal(false, false);
        });
      }.bind(this));
    }.bind(this)).then(done, done);
  }

  public testGetUserByEmailAndPassword(assert, done) {
    this.group_service.createGroup(GROUP_NAME).then(function (group: any) {
      return this.service.createUser(EMAIL, PASSWORD, group.id).then(function (existing_user) {
        return this.service.getUserByEmailAndPassword(EMAIL, PASSWORD).then(function (user) {
          assert.equal(user.id, existing_user.id);
          assert.equal(user.email, EMAIL);
          assert.equal(passhash.verify(PASSWORD, user.password), true);
        });
      }.bind(this));
    }.bind(this)).then(done, done);
  }

  public testGetUserByEmailAndPasswordWithNoUser(assert, done) {
    this.service.getUserByEmailAndPassword(EMAIL, PASSWORD).then(function (user) {
      assert.equal(true, false);
    }, function () {
      assert.equal(false, false);
    }).then(done, done);
  }

  public testGetUserByIdWithNoUser(assert, done) {
    this.service.getUserById(1).then(function (user) {
      assert.equal(true, false);
    }, function () {
      assert.equal(false, false);
    }).then(done, done);
  }

  public testDeleteUserById(assert, done) {
    var group_id, user_id;

    this.group_service.createGroup(GROUP_NAME).then(function (group: any) {
      group_id = group.id
      return this.service.createUser(EMAIL, PASSWORD, group_id);
    }.bind(this)).then(function (user) {
      user_id = user.id
      return this.service.deleteUserById(user_id);
    }.bind(this)).then(function () {
      return this.service.getUserById(user_id);
    }.bind(this)).then(function () {
      assert.equal(true, false);
    }, function () {
      assert.equal(false, false);
    }).then(done, done);
  }

  public testDeleteUserByIdWithNoUser(assert, done) {
    this.service.deleteUserById(1).then(function (user) {
      assert.equal(true, false);
    }, function () {
      assert.equal(false, false);
    }).then(done, done);
  }

  public testCreateUserWithToken(assert, done) {
    this.createToken('1').then(function (token: any) {
      return this.service.createUserWithToken(EMAIL, PASSWORD, token.value);
    }.bind(this)).then(function (user: any) {
      assert.equal(user.email, EMAIL);
      assert.equal(passhash.verify(PASSWORD, user.password), true);
      assert.equal(user.group_id, user.group_id);
    }).then(done, done);
  }

  public testCreateUserWithTokenAndInvalidEmail(assert, done) {
    this.createToken('1').then(function (token: any) {
      return this.service.createUserWithToken('invalid email', PASSWORD, token.value);
    }.bind(this)).then(function () {
      assert.equal(true, false);
    }, function () {
      assert.equal(false, false);
    }).then(done, done);
  }

  public testCreateUserWithTokenThatExists(assert, done) {
    this.createToken().then(function (token: any) {
      return this.service.createUserWithToken(EMAIL, PASSWORD, token.value);
    }.bind(this)).then(function () {
      assert.equal(true, false);
    }, function () {
      assert.equal(false, false);
    }).then(done, done);
  }

  public testGetUsersWithGroupId(assert, done) {
    this.group_service.createGroup(GROUP_NAME).then(function (group: any) {
      return this.service.createUser(EMAIL, PASSWORD, group.id);
    }.bind(this)).then(function (user) {
      return this.service.getUsersByGroupId(user.group_id);
    }.bind(this)).then(function (users) {
      assert.equal(Array.isArray(users), true);
      assert.equal(users.length, 1);
      assert.equal(users[0].email, EMAIL);
    }).then(done, done);
  }

  public testGetUsersWithInvalidGroupId(assert, done) {
    this.service.getUsersByGroupId(GROUP_ID).then(function () {
      assert.equal(true, false);
    }, function () {
      assert.equal(false, false);
    }).then(done, done);
  }

  public testDeleteUsersByGroupId(assert, done) {
    var group_id, user_id;

    this.group_service.createGroup(GROUP_NAME).then(function(group: any) {
      group_id = group.id
      return this.service.createUser(EMAIL, PASSWORD, group_id);
    }.bind(this)).then(function(user) {
      user_id = user.id
      return this.service.deleteUsersByGroupId(group_id);
    }.bind(this)).then(function() {
      return this.service.getUserById(user_id);
    }.bind(this)).then(function() {
      assert.equal(true, false);
    }, function() {
      assert.equal(false, false);
    }).then(done, done);
  }

  public testDeleteUsersByInvalidGroupId(assert, done) {
    this.service.deleteUsersByGroupId(1).then(function() {
      assert.equal(true, false);
    }, function() {
      assert.equal(false, false);
    }).then(done, done);
  }
}

(new Test()).run();
export = Test;