var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest = require('../BaseTest');
var Service = require('./Service');
var TestRepository = require('../TestRepository');
var TrackingFactory = require('../../tracking/TestFactory');
var GroupService = require('../../group/Service');
var GroupTestRepository = require('../../group/TestRepository');
var UserService = require('../../user/server/Service');
var UserTestRepository = require('../../user/TestRepository');
var TokenService = require('../../token/server/Service');
var TokenTestRepository = require('../../token/server/TestRepository');
var LONG_URL = 'http://www.example.com';
var SHORT_URL = '2';
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = 'link/server/ServiceTest';
    }
    Test.prototype.beforeEach = function () {
        this.tracking_service = TrackingFactory();
        this.group_service = new GroupService(new GroupTestRepository());
        this.token_service = new TokenService(new TokenTestRepository());
        this.user_service = new UserService(new UserTestRepository());
        this.service = new Service(new TestRepository());
        this.user_service.setGroupService(this.group_service);
        this.user_service.setTokenService(this.token_service);
        this.token_service.setUserService(this.user_service);
        this.tracking_service.setGroupService(this.group_service);
        this.service.setTrackingService(this.tracking_service);
        this.service.setTokenService(this.token_service);
        this.service.setGroupService(this.group_service);
    };
    Test.prototype.createToken = function (id) {
        var _this = this;
        if (id === void 0) { id = ''; }
        var user_email = id + 'test@example.com';
        var user_pass = 'test_password';
        var group_name = 'GROUP_NAME';
        return this.group_service.createGroup(group_name).then(function (group) {
            return _this.user_service.createUser(user_email, user_pass, group.id);
        }).then(function (user) {
            return _this.token_service.createToken(user_email, user_pass);
        });
    };
    Test.prototype.testTrackLinkNoOptions = function () {
        var _this = this;
        return this.createToken().then(function (token) {
            return _this.service.createLinkWithToken(LONG_URL, token.value);
        }).then(function (link) {
            return _this.service.trackLink(link.short_url);
        }).then(function () { return null; });
    };
    Test.prototype.testCreateLink = function () {
        var _this = this;
        var token;
        return this.createToken().then(function (new_token) {
            token = new_token;
            return _this.service.createLinkWithToken(LONG_URL, token.value);
        }).then(function (link) {
            _this.assert(link.long_url === LONG_URL);
            _this.assert(link.user_id === token.user_id);
        });
    };
    Test.prototype.testCreateLinkInvalidLongUrl = function () {
        var _this = this;
        return this.createToken().then(function (token) {
            return _this.service.createLinkWithToken('', token.value);
        }).then(this.fail(), this.pass());
    };
    Test.prototype.testCreateLinkWithShortUrl = function () {
        var _this = this;
        return this.createToken().then(function (token) {
            return _this.service.createLinkWithToken(LONG_URL, token.value, SHORT_URL);
        }).then(function (link) {
            _this.assert(link.long_url === LONG_URL);
            _this.assert(link.short_url === SHORT_URL);
        });
    };
    Test.prototype.testCreateLinkWithExistingShortUrl = function () {
        var _this = this;
        return this.createToken().then(function (token) {
            return _this.service.createLinkWithToken(LONG_URL, token.value, '2').then(function (first_link) {
                return _this.service.createLinkWithToken(LONG_URL + '/2', token.value).then(function (second_link) {
                    _this.assert(second_link.short_url === String(first_link.id));
                });
            });
        });
    };
    Test.prototype.testCreateLinkWithShortUrlOfExistingId = function () {
        var _this = this;
        return this.createToken().then(function (token) {
            return _this.service.createLinkWithToken(LONG_URL, token.value).then(function (first_link) {
                return _this.service.createLinkWithToken(LONG_URL + '/2', token.value, '' + first_link.id).then(_this.fail(), _this.pass());
            });
        });
    };
    Test.prototype.testGetLinksByUserId = function () {
        var _this = this;
        return this.createToken().then(function (token) {
            return _this.service.createLinkWithToken(LONG_URL, token.value, '2').then(function (link) {
                return _this.service.getLinksByToken(token.value).then(function (links) {
                    _this.assert(Array.isArray(links));
                    _this.assert(links.length === 1);
                    _this.assert(links[0].id === link.id);
                    _this.assert(links[0].long_url === link.long_url);
                    _this.assert(links[0].short_url === link.short_url);
                });
            });
        });
    };
    Test.prototype.testGetLinksByUserIdFromOtherGroup = function () {
        var _this = this;
        return this.createToken().then(function (token) {
            return _this.service.createLinkWithToken(LONG_URL, token.value);
        }).then(function () {
            return _this.createToken('2');
        }).then(function (token) {
            return _this.service.getLinksByToken(token.value);
        }).then(function (links) {
            _this.assert(Array.isArray(links));
            _this.assert(links.length === 0);
        });
    };
    Test.prototype.testGetLinksByUserIdWithIncorrectId = function () {
        return this.service.createLinkWithToken(LONG_URL, '1').then(this.fail(), this.pass());
    };
    Test.prototype.testDeleteLinkByIdWithToken = function () {
        var _this = this;
        var token;
        return this.createToken().then(function (created_token) {
            token = created_token;
            return _this.service.createLinkWithToken(LONG_URL, token.value);
        }).then(function (link) {
            return _this.service.deleteLinkByIdWithToken(link.id, token.value);
        }).then(this.pass(), this.fail());
    };
    Test.prototype.testDeleteLinkByInvalidIdWithToken = function () {
        var _this = this;
        return this.createToken().then(function (token) {
            return _this.service.deleteLinkByIdWithToken(1, token.value);
        }).then(this.fail(), this.pass());
    };
    Test.prototype.testDeleteLinkByIdWithInvalidToken = function () {
        var _this = this;
        var link;
        return this.createToken().then(function (token) {
            return _this.service.createLinkWithToken(LONG_URL, token.value);
        }).then(function (created_link) {
            link = created_link;
            return _this.createToken('2');
        }).then(function (token) {
            return _this.service.deleteLinkByIdWithToken(link.id, token.value);
        }).then(this.fail(), this.pass());
    };
    Test.prototype.testDeleteLinksByGroupId = function () {
        var _this = this;
        var token;
        var user_email = 'test@example.com';
        var user_pass = 'test_password';
        return this.group_service.createGroup('GROUP_NAME').then(function (group) {
            return _this.user_service.createUser(user_email, user_pass, group.id);
        }).then(function (user) {
            return _this.token_service.createToken(user_email, user_pass);
        }).then(function (created_token) {
            token = created_token;
            return _this.service.createLinkWithToken(LONG_URL, token.value);
        }).then(function (link) {
            return _this.service.deleteLinksByGroupId(link.group_id);
        }).then(function () {
            return _this.service.getLinksByToken(token.value);
        }).then(function (links) {
            _this.assert(links.length === 0);
        });
    };
    Test.prototype.testDeleteLinksByInvalidGroupId = function () {
        return this.service.deleteLinksByGroupId(1).then(this.fail(), this.pass());
    };
    return Test;
})(BaseTest);
(new Test()).run();
module.exports = Test;
//# sourceMappingURL=Service.test.js.map