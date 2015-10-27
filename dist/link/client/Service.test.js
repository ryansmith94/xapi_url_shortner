var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest = require('../BaseTest');
var Service = require('./Service');
var TestRepository = require('../TestRepository');
var LONG_URL = 'http://www.example.com';
var SHORT_URL = '2';
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = 'link/client/ServiceTest';
    }
    Test.prototype.beforeEach = function () {
        this.service = new Service(new TestRepository());
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
    Test.prototype.testCreateLinkWithShortUrlOfExistingId = function (assert, done) {
        this.service.createLink(LONG_URL).then(function (first_link) {
            return this.service.createLink(LONG_URL + '/2', '1').then(function () {
                assert.equal(true, false);
            }, function () {
                assert.equal(true, true);
            });
        }.bind(this)).then(done, done);
    };
    Test.prototype.testGetLinks = function (assert, done) {
        this.service.createLink(LONG_URL, '2').then(function (link) {
            return this.service.getLinks().then(function (links) {
                assert.equal(Array.isArray(links), true);
                assert.equal(links.length, 1);
                assert.equal(links[0].id, link.id);
                assert.equal(links[0].long_url, link.long_url);
                assert.equal(links[0].short_url, link.short_url);
            });
        }.bind(this)).then(done, done);
    };
    Test.prototype.testDeleteLinkById = function (assert, done) {
        this.service.createLink(LONG_URL).then(function (link) {
            return this.service.deleteLinkById(link.id);
        }.bind(this)).then(function () {
            assert.equal(true, true);
        }, function (err) {
            assert.equal(false, true);
        }).then(done, done);
    };
    Test.prototype.testDeleteLinkByInvalidId = function (assert, done) {
        this.service.deleteLinkById(1).then(function () {
            assert.equal(true, false);
        }, function (err) {
            assert.equal(false, false);
        }).then(done, done);
    };
    return Test;
})(BaseTest);
(new Test()).run();
module.exports = Test;
//# sourceMappingURL=Service.test.js.map