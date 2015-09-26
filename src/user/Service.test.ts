import BaseTest = require('../BaseTest');
import Service = require('./Service');
import TestRepository = require('./TestRepository');
import GroupService = require('../group/Service');
import GroupTestRepository = require('../group/TestRepository');

var EMAIL = 'test@example.com';
var PASSWORD = 'password';
var GROUP_NAME = 'Test group'
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
}

(new Test()).run();
export = Test;