import BaseTest = require('../BaseTest');
import Service = require('./ServerService');
import TestRepository = require('./TestRepository');
import TrackingService = require('../tracking/ServerService');
import TrackingTestLrsRepository = require('../tracking/TestLrsRepository');
import TrackingTestWebRepository = require('../tracking/TestWebRepository');

var LONG_URL = 'http://www.example.com';
var SHORT_URL = '1';
class Test extends BaseTest {
  protected name: string = 'link/ServerServiceTest';
  protected service: Service;

  public beforeEach() {
    var tracking_service = new TrackingService(new TrackingTestLrsRepository(), new TrackingTestWebRepository());
    this.service = new Service(new TestRepository(), tracking_service);
  }

  public testCreateLink(assert, done) {
    this.service.createLink(LONG_URL).then(function (link) {
      assert.equal(LONG_URL, link.long_url);
    }).then(done, done);
  }

  public testGetLinkByShortUrlNoOptions(assert, done) {
    this.service.getLinkByShortUrl(SHORT_URL, null).then(function (link) {
      assert.equal(SHORT_URL, link.short_url);
    }).then(done, done);
  }

  public testGetLinks(assert, done) {
    this.service.getLinks().then(function (links) {
      assert.equal(true, Array.isArray(links));
    }).then(done, done);
  }
}

(new Test()).run();
export = Test;