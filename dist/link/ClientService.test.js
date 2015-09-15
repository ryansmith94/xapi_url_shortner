var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest = require('../BaseTest');
var Service = require('./ClientService');
var TestRepository = require('./TestRepository');
var LONG_URL = 'http://www.example.com';
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = 'link/ClientServiceTest';
    }
    Test.prototype.beforeEach = function () {
        this.service = new Service(new TestRepository());
    };
    Test.prototype.testCreateLink = function (assert, done) {
        this.service.createLink(LONG_URL).then(function (link) {
            assert.equal(LONG_URL, link.long_url);
        }).then(done, done);
    };
    Test.prototype.testGetLinks = function (assert, done) {
        assert.equal(true, Array.isArray(this.service.getLinks()));
        done();
    };
    Test.prototype.testFetchLinks = function (assert, done) {
        this.service.fetchLinks().then(function (links) {
            assert.equal(true, Array.isArray(links));
        }).then(done, done);
    };
    return Test;
})(BaseTest);
(new Test()).run();
module.exports = Test;
