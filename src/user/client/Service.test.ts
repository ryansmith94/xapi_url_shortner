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

  public testCreateUser() {
    return this.service.createUser(EMAIL, PASSWORD).then((user: any) => {
      this.assert(user.email === EMAIL);
      this.assert(user.password === PASSWORD);
    });
  }

  public testCreateUserWithInvalidEmail() {
    return this.service.createUser('invalid_email', PASSWORD).then(this.fail(), this.pass());
  }
}

(new Test()).run();
export = Test;