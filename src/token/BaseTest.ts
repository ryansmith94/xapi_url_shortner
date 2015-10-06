import BaseTest = require('../BaseTest');
import BaseService = require('./BaseService');

class Test extends BaseTest {
  protected service: BaseService;
  public beforeEach() {}
}

export = Test;