var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest = require('../BaseTest');
var Service = require('./Service');
var TestRepository = require('./TestRepository');
var TrackingService = require('../tracking/Service');
var TrackingTestLrsRepository = require('../tracking/TestLrsRepository');
var TrackingTestWebRepository = require('../tracking/TestWebRepository');
var LONG_URL = 'http://www.example.com';
var SHORT_URL = '2';
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = 'link/ServiceTest';
    }
    Test.prototype.beforeEach = function () {
        var tracking_service = new TrackingService(new TrackingTestLrsRepository(), new TrackingTestWebRepository());
        this.service = new Service(new TestRepository(), tracking_service);
    };
    Test.prototype.testCreateLink = function (assert, done) {
        this.service.createLink(LONG_URL).then(function (link) {
            assert.equal(link.long_url, LONG_URL);
        }).then(done, done);
    };
    Test.prototype.testCreateLinkInvalidLongUrl = function (assert, done) {
        this.service.createLink('').then(function (link) {
            assert.equal(true, false);
        }, function (err) {
            assert.equal(true, true);
        }).then(done, done);
    };
    Test.prototype.testCreateLinkWithShortUrl = function (assert, done) {
        this.service.createLink(LONG_URL, SHORT_URL).then(function (link) {
            assert.equal(link.long_url, LONG_URL);
            assert.equal(link.short_url, SHORT_URL);
        }).then(done, done);
    };
    Test.prototype.testCreateLinkWithInvalidShortUrl = function (assert, done) {
        this.service.createLink(LONG_URL, 'AAA').then(function (link) {
            assert.equal(true, false);
        }, function (err) {
            assert.equal(true, true);
        }).then(done, done);
    };
    Test.prototype.testTrackLinkNoOptions = function (assert, done) {
        this.service.createLink(LONG_URL).then(function (link) {
            return this.service.trackLink(link.short_url, null);
        }.bind(this)).then(function () { }).then(done, done);
    };
    Test.prototype.testGetLinks = function (assert, done) {
        this.service.getLinks().then(function (links) {
            assert.equal(true, Array.isArray(links));
        }).then(done, done);
    };
    return Test;
})(BaseTest);
(new Test()).run();
module.exports = Test;
//# sourceMappingURL=Service.test.js.map