import BaseTest = require('../BaseTest');
import Service = require('./ClientService');
import TestRepository = require('./TestRepository');

var LONG_URL = 'http://www.example.com';
class Test extends BaseTest {
  protected name: string = 'ClientServiceTest';
  protected service: Service;

  public beforeEach() {
    this.service = new Service(new TestRepository());
  }

  public testCreateLink(assert, done) {
    this.service.createLink(LONG_URL).then(function (link) {
      assert.equal(LONG_URL, link.long_url);
    }).then(done, done);
  }

  public testLastCreatedLinkNull(assert, done) {
    assert.equal(null, this.service.getLastCreatedLink());
    done();
  }

  public testLastCreatedLink(assert, done) {
    this.service.createLink(LONG_URL).then(function (link) {
      assert.equal(LONG_URL, link.long_url);
      assert.equal(link, this.service.getLastCreatedLink());
    }.bind(this)).then(done, done);
  }

  public testLastCreatedLinkTwo(assert, done) {
    var second_url = LONG_URL + '/second';
    this.service.createLink(LONG_URL);
    this.service.createLink(second_url).then(function (link) {
      assert.equal(second_url, link.long_url);
      assert.equal(link, this.service.getLastCreatedLink());
    }.bind(this)).then(done, done);
  }

  public testLastCreatedLinkSame(assert, done) {
    this.service.createLink(LONG_URL).then(function (link) {
      assert.equal(LONG_URL, link.long_url);
      this.service.createLink(LONG_URL);
      assert.equal(link, this.service.getLastCreatedLink());
    }.bind(this)).then(done, done);
  }
}

(new Test()).run();
export = Test;