import BaseTest = require('../../BaseTest');
import Service = require('./Service');
import TestRepository = require('../TestRepository');

var EMAIL = 'test@example.com';
var PASSWORD = 'password';
class Test extends BaseTest {
  protected name: string = 'user/client/ServiceTest';
  protected service: Service;

  public beforeEach() {
    this.service = new Service(new TestRepository());
  }

  public testCreateUser(assert, done) {
    return this.service.createUser(EMAIL, PASSWORD).then(function (user: any) {
      assert.equal(user.email, EMAIL);
      assert.equal(user.password, PASSWORD);
    }).then(done, done);
  }

  public testCreateUserWithInvalidEmail(assert, done) {
    return this.service.createUser('invalid_email', PASSWORD).then(function (user) {
      assert.equal(true, false);
    }, function () {
      assert.equal(false, false);
    }).then(done, done);
  }
}

(new Test()).run();
export = Test;