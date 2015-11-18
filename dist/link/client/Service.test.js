var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest = require('../BaseTest');
var Factory = require('./TestFactory');
var LONG_URL = 'http://www.example.com';
var SHORT_URL = '2';
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = __filename;
    }
    Test.prototype.beforeEach = function () {
        this.service = Factory();
    };
    Test.prototype.testCreateLink = function () {
        var _this = this;
        return this.service.createLink(LONG_URL).then(function (link) {
            _this.assert(link.long_url === LONG_URL);
        });
    };
    Test.prototype.testCreateLinkInvalidLongUrl = function () {
        return this.service.createLink('').then(this.fail(), this.pass());
    };
    Test.prototype.testCreateLinkWithShortUrl = function () {
        var _this = this;
        return this.service.createLink(LONG_URL, SHORT_URL).then(function (link) {
            _this.assert(link.long_url === LONG_URL);
            _this.assert(link.short_url === SHORT_URL);
        });
    };
    Test.prototype.testCreateLinkWithInvalidShortUrl = function () {
        return this.service.createLink(LONG_URL, 'AAA').then(this.fail(), this.pass());
    };
    Test.prototype.testCreateLinkWithShortUrlOfExistingId = function () {
        var _this = this;
        return this.service.createLink(LONG_URL).then(function (first_link) {
            return _this.service.createLink(LONG_URL + '/2', '1');
        }).then(this.fail(), this.pass());
    };
    Test.prototype.testGetLinks = function () {
        var _this = this;
        return this.service.createLink(LONG_URL, '2').then(function (link) {
            return _this.service.getLinks().then(function (links) {
                _this.assert(Array.isArray(links));
                _this.assert(links.length === 1);
                _this.assert(links[0].id === link.id);
                _this.assert(links[0].long_url === link.long_url);
                _this.assert(links[0].short_url === link.short_url);
            });
        });
    };
    Test.prototype.testDeleteLinkById = function () {
        var _this = this;
        return this.service.createLink(LONG_URL).then(function (link) {
            return _this.service.deleteLinkById(link.id);
        }).then(this.pass(), this.fail());
    };
    Test.prototype.testDeleteLinkByInvalidId = function () {
        return this.service.deleteLinkById(1).then(this.fail(), this.pass());
    };
    return Test;
})(BaseTest);
(new Test()).run();
module.exports = Test;
//# sourceMappingURL=Service.test.js.map