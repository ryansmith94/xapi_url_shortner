import BaseTest = require('../../BaseTest');
import Factory = require('./TestFactory');

var EMAIL = 'test@example.com';
var PASSWORD = 'password';
class Test extends BaseTest {
  protected name: string = 'user/client/ServiceTest';
  protected service;

  public beforeEach() {
    this.service = Factory();
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