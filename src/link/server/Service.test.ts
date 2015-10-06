import BaseTest = require('../BaseTest');
import Service = require('./Service');
import TestRepository = require('../TestRepository');
import TrackingService = require('../../tracking/Service');
import TrackingTestLrsRepository = require('../../tracking/TestLrsRepository');
import TrackingTestWebRepository = require('../../tracking/TestWebRepository');

var LONG_URL = 'http://www.example.com';
class Test extends BaseTest {
  protected name: string = 'link/server/ServiceTest';
  protected service: Service;

  public beforeEach() {
    var tracking_service = new TrackingService(new TrackingTestLrsRepository(), new TrackingTestWebRepository());
    this.service = new Service(new TestRepository(), tracking_service);
  }

  public testTrackLinkNoOptions(assert, done) {
    this.service.createLink(LONG_URL).then(function (link) {
      return this.service.trackLink(link.short_url, null);
    }.bind(this)).then(function () {}).then(done, done);
  }
}

(new Test()).run();
export = Test;