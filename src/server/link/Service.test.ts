import TestCase = require('../../TestCase');
import Service = require('./Service');
import TestRepository = require('./TestRepository');

class Test extends TestCase {
  protected name: string = 'ServiceTest';
  protected service: Service;

  public beforeEach() {
    this.service = new Service(new TestRepository());
  }

  public testCreateLink(assert) {
    var long_url = 'http://www.example.com';
    this.service.createLink('http://www.example.com').then(function (link) {
      assert.equal(long_url, link.long_url);
    });
  }
}

(new Test()).run();
export = Test;