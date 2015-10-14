import BaseTest = require('../BaseTest');
import Service = require('./Service');
import TestRepository = require('./TestRepository');
import GroupService = require('../group/Service');
import GroupTestRepository = require('../group/TestRepository');

var EMAIL = 'test@example.com';
var PASSWORD = 'password';
var GROUP_NAME = 'Test group';
var GROUP_ID = 1;
class Test extends BaseTest {
  protected name: string = 'user/ServiceTest';
  protected service: Service;
  protected group_service: GroupService;

  public beforeEach() {
    this.group_service = new GroupService(new GroupTestRepository());
    this.service = new Service(new TestRepository(), this.group_service);
  }

  public testCreateUser(assert, done) {
    this.group_service.createGroup(GROUP_NAME).then(function (group: any) {
      return this.service.createUser(EMAIL, PASSWORD, group.id).then(function (user: any) {
        assert.equal(user.email, EMAIL);
        assert.equal(user.password, PASSWORD);
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
          assert.equal(user.password, PASSWORD);
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
}

(new Test()).run();
export = Test;