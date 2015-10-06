import BaseTest = require('../BaseTest');
import Service = require('./Service');
import TestRepository = require('./TestRepository');

var EMAIL = 'test@example.com';
var PASSWORD = 'password';
class Test extends BaseTest {
  protected name: string = 'token/client/ServiceTest';
  protected service: Service;

  public beforeEach() {
    this.service = new Service(new TestRepository());
  }

  public testCreateToken(assert, done) {
    return this.service.createToken(EMAIL, PASSWORD).then(function (token) {
      assert.equal(true, true);
    }).then(done, done);
  }
}

(new Test()).run();
export = Test;