import BaseTest = require('../BaseTest');
import Service = require('./ServerService');
import TestRepository = require('./TestRepository');

class Test extends BaseTest {
  protected name: string = 'ServerServiceTest';
  protected service: Service;

  public beforeEach() {
    this.service = new Service(new TestRepository());
  }

  public testCreateLink(assert, done) {
    var long_url = 'http://www.example.com';
    this.service.createLink('http://www.example.com').then(function (link) {
      assert.equal(long_url, link.long_url);
    }).then(done, done);
  }
}

(new Test()).run();
export = Test;