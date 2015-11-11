var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest = require('../BaseTest');
var Service = require('./Service');
var TestRepository = require('./TestRepository');
var UserService = require('../user/server/Service');
var UserTestRepository = require('../user/TestRepository');
var TokenService = require('../token/server/Service');
var TokenTestRepository = require('../token/server/TestRepository');
var LinkService = require('../link/server/Service');
var LinkTestRepository = require('../link/TestRepository');
var TrackingService = require('../tracking/Service');
var TrackingTestLrsRepository = require('../tracking/TestLrsRepository');
var TrackingTestWebRepository = require('../tracking/TestWebRepository');
var q = require('q');
var NAME = 'Example';
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = 'group/ServiceTest';
    }
    Test.prototype.beforeEach = function () {
        this.service = new Service(new TestRepository());
        this.user_service = new UserService(new UserTestRepository());
        this.token_service = new TokenService(new TokenTestRepository());
        this.link_service = new LinkService(new LinkTestRepository());
        this.tracking_service = new TrackingService(new TrackingTestLrsRepository(), new TrackingTestWebRepository());
        this.user_service.setGroupService(this.service);
        this.user_service.setTokenService(this.token_service);
        this.service.setUserService(this.user_service);
        this.service.setLinkService(this.link_service);
        this.token_service.setUserService(this.user_service);
        this.link_service.setTokenService(this.token_service);
        this.link_service.setTrackingService(this.tracking_service);
        this.link_service.setGroupService(this.service);
    };
    Test.prototype.testCreateGroup = function (assert, done) {
        this.service.createGroup(NAME).then(function (group) {
            assert.equal(group.name, NAME);
            assert.equal(group.verb_id, 'http://adlnet.gov/expapi/verbs/launched');
            assert.equal(group.verb_lang, 'en');
            assert.equal(group.verb_display, 'launched');
        }).then(done, done);
    };
    Test.prototype.testCreateGroupWithVerbOptions = function (assert, done) {
        var VERB_ID = 'http://www.example.com/verb_id';
        var VERB_LANG = 'en-GB';
        var VERB_DISPLAY = 'verb_display';
        this.service.createGroup(NAME, VERB_ID, VERB_LANG, VERB_DISPLAY).then(function (group) {
            assert.equal(group.name, NAME);
            assert.equal(group.verb_id, VERB_ID);
            assert.equal(group.verb_lang, VERB_LANG);
            assert.equal(group.verb_display, VERB_DISPLAY);
        }).then(done, done);
    };
    Test.prototype.testGetGroupById = function (assert, done) {
        this.service.createGroup(NAME).then(function (created_group) {
            return this.service.getGroupById(created_group.id).then(function (group) {
                assert.equal(group.id, created_group.id);
            });
        }.bind(this)).then(done, done);
    };
    Test.prototype.testGetGroupByInvalidId = function (assert, done) {
        this.service.getGroupById(1).then(function () {
            assert.equal(true, false);
        }, function () {
            assert.equal(false, false);
        }).then(done, done);
    };
    Test.prototype.testGetGroups = function (assert, done) {
        this.service.createGroup(NAME).then(function (created_group) {
            return this.service.getGroups().then(function (groups) {
                assert.equal(groups.length, 1);
                assert.equal(groups[0].id, created_group.id);
                assert.equal(groups[0].name, created_group.name);
            });
        }.bind(this)).then(done, done);
    };
    Test.prototype.testDeleteGroupById = function (assert, done) {
        var models;
        this.createGroup().then(function (created_models) {
            models = created_models;
            return this.service.deleteGroupById(models.group.id);
        }.bind(this)).then(function (result) {
            assert.equal(result, true);
            return q.allSettled([
                this.user_service.getUserById(models.user.id),
                this.service.getGroupById(models.group.id)
            ]);
        }.bind(this)).then(function (results) {
            results.forEach(function (result) {
                assert.equal(result.state === 'fulfilled', false);
            });
        }).then(done, done);
    };
    Test.prototype.testDeleteGroupByInvalidId = function (assert, done) {
        this.service.deleteGroupById(1).then(function () {
            assert.equal(true, false);
        }, function () {
            assert.equal(false, false);
        }).then(done, done);
    };
    Test.prototype.createGroup = function () {
        var group, user;
        return this.service.createGroup(NAME).then(function (created_group) {
            group = created_group;
            return this.user_service.createUser('test@example.com', 'pass', group.id);
        }.bind(this)).then(function (created_user) {
            user = created_user;
            return this.token_service.createToken(user.email, 'pass');
        }.bind(this)).then(function (token) {
            return this.link_service.createLinkWithToken('http://example.com', token.value);
        }.bind(this)).then(function (link) {
            return { group: group, user: user, link: link };
        });
    };
    return Test;
})(BaseTest);
(new Test()).run();
module.exports = Test;
//# sourceMappingURL=Service.test.js.map