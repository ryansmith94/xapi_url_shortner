var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest_1 = require('../BaseTest');
var TestFactory_1 = require('./TestFactory');
var TestFactory_2 = require('../../tracking/TestFactory');
var TestFactory_3 = require('../../group/TestFactory');
var TestFactory_4 = require('../../user/server/TestFactory');
var LONG_URL = 'http://www.example.com';
var SHORT_URL = '2';
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = __filename;
    }
    Test.prototype.beforeEach = function () {
        this.tracking_service = TestFactory_2.default();
        this.group_service = TestFactory_3.default();
        this.user_service = TestFactory_4.default();
        this.service = TestFactory_1.default();
        this.user_service.setGroupService(this.group_service);
        this.tracking_service.setGroupService(this.group_service);
        this.service.setTrackingService(this.tracking_service);
        this.service.setGroupService(this.group_service);
        this.service.setUserService(this.user_service);
    };
    Test.prototype.createUser = function (id) {
        var _this = this;
        if (id === void 0) { id = ''; }
        var user_email = id + 'test@example.com';
        var user_pass = 'test_password';
        var group_name = 'GROUP_NAME';
        return this.group_service.createGroup(group_name).then(function (group) {
            return _this.user_service.createUser(user_email, user_pass, group.id);
        });
    };
    Test.prototype.testTrackLinkNoOptions = function () {
        var _this = this;
        return this.createUser().then(function (user) {
            return _this.service.createLink(LONG_URL, user.id);
        }).then(function (link) {
            return _this.service.trackLink(link.short_url);
        }).then(function () { return null; });
    };
    Test.prototype.testCreateLink = function () {
        var _this = this;
        var user;
        return this.createUser().then(function (created_user) {
            user = created_user;
            return _this.service.createLink(LONG_URL, user.id);
        }).then(function (link) {
            _this.assert(link.long_url === LONG_URL);
            _this.assert(link.user_id === user.id);
        });
    };
    Test.prototype.testCreateLinkInvalidLongUrl = function () {
        var _this = this;
        return this.createUser().then(function (user) {
            return _this.service.createLink('', user.id);
        }).then(this.fail(), this.pass());
    };
    Test.prototype.testCreateLinkWithShortUrl = function () {
        var _this = this;
        return this.createUser().then(function (user) {
            return _this.service.createLink(LONG_URL, user.id, SHORT_URL);
        }).then(function (link) {
            _this.assert(link.long_url === LONG_URL);
            _this.assert(link.short_url === SHORT_URL);
        });
    };
    Test.prototype.testCreateLinkWithExistingShortUrl = function () {
        var _this = this;
        return this.createUser().then(function (user) {
            return _this.service.createLink(LONG_URL, user.id, '2').then(function (first_link) {
                return _this.service.createLink(LONG_URL + '/2', user.id).then(function (second_link) {
                    _this.assert(second_link.short_url === String(first_link.id));
                });
            });
        });
    };
    Test.prototype.testCreateLinkWithShortUrlOfExistingId = function () {
        var _this = this;
        return this.createUser().then(function (user) {
            return _this.service.createLink(LONG_URL, user.id).then(function (first_link) {
                return _this.service.createLink(LONG_URL + '/2', user.id, '' + first_link.id).then(_this.fail(), _this.pass());
            });
        });
    };
    Test.prototype.testGetLinks = function () {
        var _this = this;
        return this.createUser().then(function (user) {
            return _this.service.createLink(LONG_URL, user.id, '2').then(function (link) {
                return _this.service.getLinks(user.id).then(function (links) {
                    _this.assert(Array.isArray(links));
                    _this.assert(links.length === 1);
                    _this.assert(links[0].id === link.id);
                    _this.assert(links[0].long_url === link.long_url);
                    _this.assert(links[0].short_url === link.short_url);
                });
            });
        });
    };
    Test.prototype.testGetLinksFromOtherGroup = function () {
        var _this = this;
        return this.createUser().then(function (user) {
            return _this.service.createLink(LONG_URL, user.id);
        }).then(function () {
            return _this.createUser('2');
        }).then(function (user) {
            return _this.service.getLinks(user.id);
        }).then(function (links) {
            _this.assert(Array.isArray(links));
            _this.assert(links.length === 0);
        });
    };
    Test.prototype.testGetLinksWithIncorrectId = function () {
        return this.service.getLinks(1).then(this.fail(), this.pass());
    };
    Test.prototype.testDeleteLinkById = function () {
        var _this = this;
        var user;
        return this.createUser().then(function (created_user) {
            user = created_user;
            return _this.service.createLink(LONG_URL, user.id);
        }).then(function (link) {
            return _this.service.deleteLinkById(link.id, user.id);
        }).then(this.pass(), this.fail());
    };
    Test.prototype.testDeleteLinkByInvalidId = function () {
        var _this = this;
        return this.createUser().then(function (user) {
            return _this.service.deleteLinkById(1, user.id);
        }).then(this.fail(), this.pass());
    };
    Test.prototype.testDeleteLinkByIdWithInvalidUser = function () {
        var _this = this;
        var link;
        return this.createUser().then(function (user) {
            return _this.service.createLink(LONG_URL, user.id);
        }).then(function (created_link) {
            link = created_link;
            return _this.createUser('2');
        }).then(function (user) {
            return _this.service.deleteLinkById(link.id, user.id);
        }).then(this.fail(), this.pass());
    };
    Test.prototype.testDeleteLinksByGroupId = function () {
        var _this = this;
        var user;
        var user_email = 'test@example.com';
        var user_pass = 'test_password';
        return this.createUser().then(function (created_user) {
            user = created_user;
            return _this.service.createLink(LONG_URL, user.id);
        }).then(function (link) {
            return _this.service.deleteLinksByGroupId(link.group_id);
        }).then(function () {
            return _this.service.getLinks(user.id);
        }).then(function (links) {
            _this.assert(links.length === 0);
        });
    };
    Test.prototype.testDeleteLinksByInvalidGroupId = function () {
        return this.service.deleteLinksByGroupId(1).then(this.fail(), this.pass());
    };
    return Test;
})(BaseTest_1.default);
(new Test()).run();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Test;
//# sourceMappingURL=Service.test.js.map