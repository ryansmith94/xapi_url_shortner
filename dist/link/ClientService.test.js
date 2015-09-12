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
        this.name = 'ClientServiceTest';
    }
    Test.prototype.beforeEach = function () {
        this.service = new Service(new TestRepository());
    };
    Test.prototype.testCreateLink = function (assert, done) {
        this.service.createLink(LONG_URL).then(function (link) {
            assert.equal(LONG_URL, link.long_url);
        }).then(done, done);
    };
    Test.prototype.testLastCreatedLinkNull = function (assert, done) {
        assert.equal(null, this.service.getLastCreatedLink());
        done();
    };
    Test.prototype.testLastCreatedLink = function (assert, done) {
        this.service.createLink(LONG_URL).then(function (link) {
            assert.equal(LONG_URL, link.long_url);
            assert.equal(link, this.service.getLastCreatedLink());
        }.bind(this)).then(done, done);
    };
    Test.prototype.testLastCreatedLinkTwo = function (assert, done) {
        var second_url = LONG_URL + '/second';
        this.service.createLink(LONG_URL);
        this.service.createLink(second_url).then(function (link) {
            assert.equal(second_url, link.long_url);
            assert.equal(link, this.service.getLastCreatedLink());
        }.bind(this)).then(done, done);
    };
    Test.prototype.testLastCreatedLinkSame = function (assert, done) {
        this.service.createLink(LONG_URL).then(function (link) {
            assert.equal(LONG_URL, link.long_url);
            this.service.createLink(LONG_URL);
            assert.equal(link, this.service.getLastCreatedLink());
        }.bind(this)).then(done, done);
    };
    return Test;
})(BaseTest);
(new Test()).run();
module.exports = Test;
