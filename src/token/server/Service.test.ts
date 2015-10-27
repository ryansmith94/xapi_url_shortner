import BaseTest = require('../BaseTest');
import Service = require('./Service');
import TestRepository = require('./TestRepository');
import UserService = require('../../user/server/Service');
import UserTestRepository = require('../../user/TestRepository');
import GroupService = require('../../group/Service');
import GroupTestRepository = require('../../group/TestRepository');

var EMAIL = 'test@example.com';
var PASSWORD = 'password';
var GROUP_NAME = 'Test group';
class Test extends BaseTest {
  protected name: string = 'token/server/ServiceTest';
  protected service: Service;
  protected group_service: GroupService;
  protected user_service: UserService;

  public beforeEach() {
    // Initialises services.
    this.group_service = new GroupService(new GroupTestRepository());
    this.service = new Service(new TestRepository());
    this.user_service = new UserService(new UserTestRepository());

    // Injects services into services.
    this.user_service.setGroupService(this.group_service);
    this.user_service.setTokenService(this.service);
    this.service.setUserService(this.user_service);
  }

  public testCreateToken(assert, done) {
    this.group_service.createGroup(GROUP_NAME).then(function (group: any) {
      return this.user_service.createUser(EMAIL, PASSWORD, group.id).then(function (user: any) {
        return this.service.createToken(EMAIL, PASSWORD).then(function (token) {
          assert.equal(typeof token.value, 'string');
          assert.equal(token.user_id, user.id);
        }.bind(this));
      }.bind(this));
    }.bind(this)).then(done, done);
  }

  public testCreateTokenWithInvalidUser(assert, done) {
    this.service.createToken(EMAIL, PASSWORD).then(function (token) {
      assert.equal(true, false);
    }, function () {
      assert.equal(false, false);
    }).then(done, done);
  }

  public testGetUserByValue(assert, done) {
    this.group_service.createGroup(GROUP_NAME).then(function (group: any) {
      return this.user_service.createUser(EMAIL, PASSWORD, group.id).then(function (user: any) {
        return this.service.createToken(EMAIL, PASSWORD).then(function (token) {
          return this.service.getUserByValue(token.value).then(function (token_user) {
            assert.equal(token_user.id, token.user_id);
          });
        }.bind(this));
      }.bind(this));
    }.bind(this)).then(done, done);
  }
}

(new Test()).run();
export = Test;