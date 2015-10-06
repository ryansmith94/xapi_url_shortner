import BaseTest = require('../BaseTest');
import Service = require('./Service');
import TestRepository = require('../TestRepository');

class Test extends BaseTest {
  protected name: string = 'link/client/ServiceTest';
  protected service: Service;

  public beforeEach() {
    this.service = new Service(new TestRepository());
  }
}

(new Test()).run();
export = Test;