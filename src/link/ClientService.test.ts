import BaseTest = require('../BaseTest');
import Service = require('./ClientService');
import TestRepository = require('./TestRepository');

var LONG_URL = 'http://www.example.com';
class Test extends BaseTest {
  protected name: string = 'link/ClientServiceTest';
  protected service: Service;

  public beforeEach() {
    this.service = new Service(new TestRepository());
  }

  public testCreateLink(assert, done) {
    this.service.createLink(LONG_URL).then(function (link) {
      assert.equal(LONG_URL, link.long_url);
    }).then(done, done);
  }

  public testCreateLinkInvalidUrl(assert, done) {
    this.service.createLink('').then(function (link) {
      assert.equal(true, false);
    }, function (err) {
      assert.equal(true, true)
    }).then(done, done); 
  }

  public testGetLinks(assert, done) {
    assert.equal(true, Array.isArray(this.service.getLinks()));
    done();
  }

  public testFetchLinks(assert, done) {
    this.service.fetchLinks().then(function (links) {
      assert.equal(true, Array.isArray(links));
    }).then(done, done);
  }
}

(new Test()).run();
export = Test;