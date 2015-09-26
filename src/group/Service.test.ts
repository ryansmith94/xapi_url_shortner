import BaseTest = require('../BaseTest');
import Service = require('./Service');
import TestRepository = require('./TestRepository');

var NAME = 'Example'
class Test extends BaseTest {
  protected name: string = 'group/ServiceTest';
  protected service: Service;

  public beforeEach() {
    this.service = new Service(new TestRepository());
  }

  public testCreateGroup(assert, done) {
    this.service.createGroup(NAME).then(function (group) {
      assert.equal(group.name, NAME);
    }).then(done, done);
  }
}

(new Test()).run();
export = Test;