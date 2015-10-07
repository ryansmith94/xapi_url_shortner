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
var GroupService = require('../../group/Service');
var GroupTestRepository = require('../../group/TestRepository');
var UserService = require('../../user/Service');
var UserTestRepository = require('../../user/TestRepository');
var TokenService = require('../../token/Server/Service');
var TokenTestRepository = require('../../token/Server/TestRepository');
var LONG_URL = 'http://www.example.com';
var SHORT_URL = '2';
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = 'link/server/ServiceTest';
    }
    Test.prototype.beforeEach = function () {
        var tracking_service = new TrackingService(new TrackingTestLrsRepository(), new TrackingTestWebRepository());
        this.group_service = new GroupService(new GroupTestRepository());
        this.user_service = new UserService(new UserTestRepository(), this.group_service);
        this.token_service = new TokenService(new TokenTestRepository(), this.user_service);
        this.service = new Service(new TestRepository(), tracking_service, this.token_service);
    };
    Test.prototype.createToken = function (id) {
        if (id === void 0) { id = ''; }
        var user_email = id + 'test@example.com';
        var user_pass = 'test_password';
        var group_name = 'GROUP_NAME';
        return this.group_service.createGroup(group_name).then(function (group) {
            return this.user_service.createUser(user_email, user_pass, group.id);
        }.bind(this)).then(function (user) {
            return this.token_service.createToken(user_email, user_pass);
        }.bind(this));
    };
    Test.prototype.testTrackLinkNoOptions = function (assert, done) {
        this.createToken().then(function (token) {
            return this.service.createLinkWithToken(LONG_URL, token.value);
        }.bind(this)).then(function (link) {
            return this.service.trackLink(link.short_url);
        }.bind(this)).then(function () { }).then(done, done);
    };
    Test.prototype.testCreateLink = function (assert, done) {
        var token;
        this.createToken().then(function (new_token) {
            token = new_token;
            return this.service.createLinkWithToken(LONG_URL, token.value);
        }.bind(this)).then(function (link) {
            assert.equal(link.long_url, LONG_URL);
            assert.equal(link.user_id, token.user_id);
        }).then(done, done);
    };
    Test.prototype.testCreateLinkInvalidLongUrl = function (assert, done) {
        this.createToken().then(function (token) {
            return this.service.createLinkWithToken('', token.value);
        }.bind(this)).then(function (link) {
            assert.equal(true, false);
        }, function (err) {
            assert.equal(true, true);
        }).then(done, done);
    };
    Test.prototype.testCreateLinkWithShortUrl = function (assert, done) {
        this.createToken().then(function (token) {
            return this.service.createLinkWithToken(LONG_URL, token.value, SHORT_URL);
        }.bind(this)).then(function (link) {
            assert.equal(link.long_url, LONG_URL);
            assert.equal(link.short_url, SHORT_URL);
        }).then(done, done);
    };
    Test.prototype.testCreateLinkWithExistingShortUrl = function (assert, done) {
        this.createToken().then(function (token) {
            return this.service.createLinkWithToken(LONG_URL, token.value, '2').then(function (first_link) {
                return this.service.createLinkWithToken(LONG_URL + '/2', token.value).then(function (second_link) {
                    assert.equal(second_link.short_url, first_link.id);
                });
            }.bind(this));
        }.bind(this)).then(done, done);
    };
    Test.prototype.testCreateLinkWithShortUrlOfExistingId = function (assert, done) {
        this.createToken().then(function (token) {
            return this.service.createLinkWithToken(LONG_URL, token.value).then(function (first_link) {
                return this.service.createLinkWithToken(LONG_URL + '/2', token.value, '' + first_link.id).then(function () {
                    assert.equal(true, false);
                }, function () {
                    assert.equal(true, true);
                });
            }.bind(this));
        }.bind(this)).then(done, done);
    };
    Test.prototype.testGetLinksByUserId = function (assert, done) {
        this.createToken().then(function (token) {
            return this.service.createLinkWithToken(LONG_URL, token.value, '2').then(function (link) {
                return this.service.getLinksByToken(token.value).then(function (links) {
                    assert.equal(Array.isArray(links), true);
                    assert.equal(links.length, 1);
                    assert.equal(links[0].id, link.id);
                    assert.equal(links[0].long_url, link.long_url);
                    assert.equal(links[0].short_url, link.short_url);
                });
            }.bind(this));
        }.bind(this)).then(done, done);
    };
    Test.prototype.testtestGetLinksByUserIdFromOtherGroup = function (assert, done) {
        this.createToken().then(function (token) {
            return this.service.createLinkWithToken(LONG_URL, token.value);
        }.bind(this)).then(function () {
            return this.createToken('2');
        }.bind(this)).then(function (token) {
            return this.service.getLinksByToken(token.value);
        }.bind(this)).then(function (links) {
            assert.equal(Array.isArray(links), true);
            assert.equal(links.length, 0);
        }.bind(this)).then(done, done);
    };
    Test.prototype.testtestGetLinksByUserIdWithIncorrectId = function (assert, done) {
        this.service.createLinkWithToken(LONG_URL, '1').then(function () {
            assert.equal(true, false);
        }, function () {
            assert.equal(false, false);
        }).then(done, done);
    };
    return Test;
})(BaseTest);
(new Test()).run();
module.exports = Test;
//# sourceMappingURL=Service.test.js.map