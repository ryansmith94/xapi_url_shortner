import BaseTest from '../../BaseTest';
import Factory from './TestFactory';

var EMAIL = 'test@example.com';
var PASSWORD = 'password';
class Test extends BaseTest {
  protected name: string = __filename;
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
export default Test;