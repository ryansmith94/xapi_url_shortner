import BaseTest = require('../BaseTest');
import Service = require('./ServerService');
import TestRepository = require('./TestRepository');

var LONG_URL = 'http://www.example.com';
var SHORT_URL = '1';
class Test extends BaseTest {
  protected name: string = 'ServerServiceTest';
  protected service: Service;

  public beforeEach() {
    this.service = new Service(new TestRepository());
  }

  public testCreateLink(assert, done) {
    this.service.createLink(LONG_URL).then(function (link) {
      assert.equal(LONG_URL, link.long_url);
    }).then(done, done);
  }

  public testGetLinkByShortUrl(assert, done) {
    this.service.getLinkByShortUrl(SHORT_URL).then(function (link) {
      assert.equal(SHORT_URL, link.short_url);
    }).then(done, done);
  }
}

(new Test()).run();
export = Test;