var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest = require('../BaseTest');
var Service = require('./Service');
var TestLrsRepository = require('./TestLrsRepository');
var TestWebRepository = require('./TestWebRepository');
var GroupService = require('../group/Service');
var GroupTestRepository = require('../group/TestRepository');
var LINK = {
    id: 1,
    long_url: 'http://www.example.com',
    short_url: '1',
    user_id: 1,
    group_id: 1
};
var ACTOR = {
    account: {
        homePage: 'http://www.example.com',
        name: '1'
    }
};
var GROUP = {
    name: 'Test group',
    verb_id: 'http://www.example.com/verb_id',
    verb_lang: 'en-GB',
    verb_display: 'clicked'
};
var CONTEXT = {
    platform: 'Test'
};
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = 'tracking/ServiceTest';
    }
    Test.prototype.beforeEach = function () {
        this.group_service = new GroupService(new GroupTestRepository());
        this.service = new Service(new TestLrsRepository(), new TestWebRepository());
        this.service.setGroupService(this.group_service);
    };
    Test.prototype.assertStatement = function (assert, statement) {
        assert.equal(LINK.long_url, statement.object.id);
        assert.equal('http://localhost:3000/' + LINK.short_url, statement.object.definition.moreInfo);
        assert.equal(LINK.long_url, statement.object.definition.name['en-GB']);
        assert.equal(LINK.user_id, statement.context.instructor.account.name);
        assert.equal(GROUP.verb_id, statement.verb.id);
        assert.equal(!statement.verb.display[GROUP.verb_lang], false);
        assert.equal(GROUP.verb_display, statement.verb.display[GROUP.verb_lang]);
    };
    Test.prototype.createGroup = function () {
        return this.group_service.createGroup(GROUP.name, GROUP.verb_id, GROUP.verb_lang, GROUP.verb_display);
    };
    Test.prototype.testTrackLinkNoOptions = function (assert, done) {
        this.createGroup().then(function (group) {
            LINK.group_id = group.id;
            return this.service.trackLink(LINK, null);
        }.bind(this)).then(function (statement) {
            this.assertStatement(assert, statement);
        }.bind(this)).then(done, done);
    };
    Test.prototype.testTrackLinkWithActor = function (assert, done) {
        this.createGroup().then(function (group) {
            LINK.group_id = group.id;
            return this.service.trackLink(LINK, { actor: ACTOR });
        }.bind(this)).then(function (statement) {
            assert.equal(ACTOR, statement.actor);
            this.assertStatement(assert, statement);
        }.bind(this)).then(done, done);
    };
    Test.prototype.testTrackLinkWithContext = function (assert, done) {
        this.createGroup().then(function (group) {
            LINK.group_id = group.id;
            return this.service.trackLink(LINK, { context: CONTEXT });
        }.bind(this)).then(function (statement) {
            assert.equal(CONTEXT, statement.context);
            this.assertStatement(assert, statement);
        }.bind(this)).then(done, done);
    };
    Test.prototype.testTrackLinkWithActorAndContext = function (assert, done) {
        this.createGroup().then(function (group) {
            LINK.group_id = group.id;
            return this.service.trackLink(LINK, { actor: ACTOR, context: CONTEXT });
        }.bind(this)).then(function (statement) {
            assert.equal(ACTOR, statement.actor);
            assert.equal(CONTEXT, statement.context);
            this.assertStatement(assert, statement);
        }.bind(this)).then(done, done);
    };
    return Test;
})(BaseTest);
(new Test()).run();
module.exports = Test;
//# sourceMappingURL=Service.test.js.map