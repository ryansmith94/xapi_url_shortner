var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest = require('../BaseTest');
var Factory = require('./TestFactory');
var UserFactory = require('../user/server/TestFactory');
var TokenFactory = require('../token/server/TestFactory');
var LinkFactory = require('../link/server/TestFactory');
var q = require('q');
var NAME = 'Example';
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = __filename;
    }
    Test.prototype.beforeEach = function () {
        this.service = Factory();
        this.user_service = UserFactory();
        this.token_service = TokenFactory();
        this.link_service = LinkFactory();
        this.user_service.setGroupService(this.service);
        this.user_service.setTokenService(this.token_service);
        this.service.setUserService(this.user_service);
        this.service.setLinkService(this.link_service);
        this.token_service.setUserService(this.user_service);
        this.link_service.setTokenService(this.token_service);
        this.link_service.setGroupService(this.service);
    };
    Test.prototype.testCreateGroup = function () {
        var _this = this;
        return this.service.createGroup(NAME).then(function (group) {
            _this.assert(group.name === NAME);
            _this.assert(group.verb_id === 'http://adlnet.gov/expapi/verbs/launched');
            _this.assert(group.verb_lang === 'en');
            _this.assert(group.verb_display === 'launched');
        });
    };
    Test.prototype.testCreateGroupWithVerbOptions = function () {
        var _this = this;
        var VERB_ID = 'http://www.example.com/verb_id';
        var VERB_LANG = 'en-GB';
        var VERB_DISPLAY = 'verb_display';
        return this.service.createGroup(NAME, VERB_ID, VERB_LANG, VERB_DISPLAY).then(function (group) {
            _this.assert(group.name === NAME);
            _this.assert(group.verb_id === VERB_ID);
            _this.assert(group.verb_lang === VERB_LANG);
            _this.assert(group.verb_display === VERB_DISPLAY);
        });
    };
    Test.prototype.testGetGroupById = function () {
        var _this = this;
        return this.service.createGroup(NAME).then(function (created_group) {
            return _this.service.getGroupById(created_group.id).then(function (group) {
                _this.assert(group.id === created_group.id);
            });
        });
    };
    Test.prototype.testGetGroupByInvalidId = function () {
        return this.service.getGroupById(1).then(this.fail(), this.pass());
    };
    Test.prototype.testGetGroups = function () {
        var _this = this;
        return this.service.createGroup(NAME).then(function (created_group) {
            return _this.service.getGroups().then(function (groups) {
                _this.assert(groups.length === 1);
                _this.assert(groups[0].id === created_group.id);
                _this.assert(groups[0].name === created_group.name);
            });
        });
    };
    Test.prototype.testDeleteGroupById = function () {
        var _this = this;
        var models;
        return this.createGroup().then(function (created_models) {
            models = created_models;
            return _this.service.deleteGroupById(models.group.id);
        }).then(function (result) {
            _this.assert(result === true);
            return q.allSettled([
                _this.user_service.getUserById(models.user.id),
                _this.service.getGroupById(models.group.id)
            ]);
        }).then(function (results) {
            results.forEach(function (result) {
                _this.assert(result.state !== 'fulfilled');
            });
        });
    };
    Test.prototype.testDeleteGroupByInvalidId = function () {
        return this.service.deleteGroupById(1).then(this.fail(), this.pass());
    };
    Test.prototype.createGroup = function () {
        var _this = this;
        var group, user;
        return this.service.createGroup(NAME).then(function (created_group) {
            group = created_group;
            return _this.user_service.createUser('test@example.com', 'pass', group.id);
        }).then(function (created_user) {
            user = created_user;
            return _this.token_service.createToken(user.email, 'pass');
        }).then(function (token) {
            return _this.link_service.createLinkWithToken('http://example.com', token.value);
        }).then(function (link) {
            return { group: group, user: user, link: link };
        });
    };
    return Test;
})(BaseTest);
(new Test()).run();
module.exports = Test;
//# sourceMappingURL=Service.test.js.map