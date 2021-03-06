import BaseTest from '../BaseTest';
import Factory from './TestFactory';

var EMAIL = 'test@example.com';
var PASSWORD = 'password';
class Test extends BaseTest {
  protected name: string = __filename;
  protected service;

  public beforeEach() {
    this.service = Factory();
  }

  public testCreateToken() {
    return this.service.createToken(EMAIL, PASSWORD).then(this.pass());
  }
}

(new Test()).run();
export default Test;