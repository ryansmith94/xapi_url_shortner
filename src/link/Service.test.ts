import BaseTest = require('../BaseTest');
import Service = require('./Service');
import TestRepository = require('./TestRepository');
import TrackingService = require('../tracking/Service');
import TrackingTestLrsRepository = require('../tracking/TestLrsRepository');
import TrackingTestWebRepository = require('../tracking/TestWebRepository');

var LONG_URL = 'http://www.example.com';
var SHORT_URL = '2';
class Test extends BaseTest {
  protected name: string = 'link/ServiceTest';
  protected service: Service;

  public beforeEach() {
    var tracking_service = new TrackingService(new TrackingTestLrsRepository(), new TrackingTestWebRepository());
    this.service = new Service(new TestRepository(), tracking_service);
  }

  public testCreateLink(assert, done) {
    this.service.createLink(LONG_URL).then(function (link) {
      assert.equal(link.long_url, LONG_URL);
    }).then(done, done);
  }

  public testCreateLinkInvalidLongUrl(assert, done) {
    this.service.createLink('').then(function (link) {
      assert.equal(true, false);
    }, function (err) {
      assert.equal(true, true)
    }).then(done, done);
  }

  public testCreateLinkWithShortUrl(assert, done) {
    this.service.createLink(LONG_URL, SHORT_URL).then(function (link) {
      assert.equal(link.long_url, LONG_URL);
      assert.equal(link.short_url, SHORT_URL);
    }).then(done, done);
  }

  public testCreateLinkWithInvalidShortUrl(assert, done) {
    this.service.createLink(LONG_URL, 'AAA').then(function (link) {
      assert.equal(true, false);
    }, function (err) {
      assert.equal(true, true)
    }).then(done, done);
  }

  public testCreateLinkWithExistingShortUrl(assert, done) {
    this.service.createLink(LONG_URL, '2').then(function (first_link) {
      return this.service.createLink(LONG_URL+'/2').then(function (second_link) {
        assert.equal(second_link.short_url, first_link.id);
      });
    }.bind(this)).then(done, done);
  }

  public testCreateLinkWithShortUrlOfExistingId(assert, done) {
    this.service.createLink(LONG_URL).then(function (first_link) {
      return this.service.createLink(LONG_URL+'/2', '1').then(function () {
        assert.equal(true, false);
      }, function () {
        assert.equal(true, true);
      });
    }.bind(this)).then(done, done);
  }

  public testTrackLinkNoOptions(assert, done) {
    this.service.createLink(LONG_URL).then(function (link) {
      return this.service.trackLink(link.short_url, null);
    }.bind(this)).then(function () {}).then(done, done);
  }

  public testGetLinks(assert, done) {
    this.service.getLinks().then(function (links) {
      assert.equal(true, Array.isArray(links));
    }).then(done, done);
  }
}

(new Test()).run();
export = Test;