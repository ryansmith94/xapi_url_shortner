var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest = require('../BaseTest');
var Service = require('./Service');
var TestRepository = require('../TestRepository');
var TrackingService = require('../../tracking/Service');
var TrackingTestLrsRepository = require('../../tracking/TestLrsRepository');
var TrackingTestWebRepository = require('../../tracking/TestWebRepository');
var LONG_URL = 'http://www.example.com';
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = 'link/server/ServiceTest';
    }
    Test.prototype.beforeEach = function () {
        var tracking_service = new TrackingService(new TrackingTestLrsRepository(), new TrackingTestWebRepository());
        this.service = new Service(new TestRepository(), tracking_service);
    };
    Test.prototype.testTrackLinkNoOptions = function (assert, done) {
        this.service.createLink(LONG_URL).then(function (link) {
            return this.service.trackLink(link.short_url, null);
        }.bind(this)).then(function () { }).then(done, done);
    };
    return Test;
})(BaseTest);
(new Test()).run();
module.exports = Test;
//# sourceMappingURL=Service.test.js.map