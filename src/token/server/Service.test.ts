import BaseTest = require('../BaseTest');
import Factory = require('./TestFactory');
import UserFactory = require('../../user/server/TestFactory');
import GroupFactory = require('../../group/TestFactory');

var EMAIL = 'test@example.com';
var PASSWORD = 'password';
var GROUP_NAME = 'Test group';
class Test extends BaseTest {
  protected name: string = __filename;
  protected service;
  protected group_service;
  protected user_service;

  public beforeEach() {
    // Initialises services.
    this.group_service = GroupFactory();
    this.service = Factory();
    this.user_service = UserFactory();

    // Injects services into services.
    this.user_service.setGroupService(this.group_service);
    this.user_service.setTokenService(this.service);
    this.service.setUserService(this.user_service);
  }

  public testCreateToken() {
    return this.group_service.createGroup(GROUP_NAME).then((group: any) => {
      return this.user_service.createUser(EMAIL, PASSWORD, group.id);
    }).then((user: any) => {
      return this.service.createToken(EMAIL, PASSWORD).then((token) => {
        this.assert(typeof token.value === 'string');
        this.assert(token.user_id === user.id);
      });
    });
  }

  public testCreateTokenWithInvalidUser() {
    return this.service.createToken(EMAIL, PASSWORD).then(this.fail(), this.pass());
  }

  public testGetUserByValue() {
    return this.group_service.createGroup(GROUP_NAME).then((group: any) => {
      return this.user_service.createUser(EMAIL, PASSWORD, group.id);
    }).then((user: any) => {
      return this.service.createToken(EMAIL, PASSWORD).then((token) => {
        return this.service.getUserByValue(token.value).then((token_user) => {
          this.assert(token_user.id === token.user_id);
        });
      });
    });
  }
}

(new Test()).run();
export = Test;