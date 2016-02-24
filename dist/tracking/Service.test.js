"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest_1 = require('../BaseTest');
var TestFactory_1 = require('./TestFactory');
var TestFactory_2 = require('../group/TestFactory');
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
        this.name = __filename;
    }
    Test.prototype.beforeEach = function () {
        this.group_service = TestFactory_2.default();
        this.service = TestFactory_1.default();
        this.service.setGroupService(this.group_service);
    };
    Test.prototype.assertStatement = function (statement) {
        this.assert(LINK.long_url === statement.object.id);
        this.assert('http://localhost:3000/' + LINK.short_url === statement.object.definition.moreInfo);
        this.assert(LINK.long_url === statement.object.definition.name['en-GB']);
        this.assert(String(LINK.user_id) === statement.context.instructor.account.name);
        this.assert(GROUP.verb_id === statement.verb.id);
        this.assert(!!statement.verb.display[GROUP.verb_lang]);
        this.assert(GROUP.verb_display === statement.verb.display[GROUP.verb_lang]);
    };
    Test.prototype.createGroup = function () {
        return this.group_service.createGroup(GROUP.name, GROUP.verb_id, GROUP.verb_lang, GROUP.verb_display);
    };
    Test.prototype.testTrackLinkNoOptions = function () {
        var _this = this;
        return this.createGroup().then(function (group) {
            LINK.group_id = group.id;
            return _this.service.trackLink(LINK, null);
        }).then(this.assertStatement.bind(this));
    };
    Test.prototype.testTrackLinkWithActor = function () {
        var _this = this;
        return this.createGroup().then(function (group) {
            LINK.group_id = group.id;
            return _this.service.trackLink(LINK, { actor: ACTOR });
        }).then(function (statement) {
            _this.assert(ACTOR === statement.actor);
            _this.assertStatement(statement);
        });
    };
    Test.prototype.testTrackLinkWithContext = function () {
        var _this = this;
        return this.createGroup().then(function (group) {
            LINK.group_id = group.id;
            return _this.service.trackLink(LINK, { context: CONTEXT });
        }).then(function (statement) {
            _this.assert(CONTEXT === statement.context);
            _this.assertStatement(statement);
        });
    };
    Test.prototype.testTrackLinkWithActorAndContext = function () {
        var _this = this;
        return this.createGroup().then(function (group) {
            LINK.group_id = group.id;
            return _this.service.trackLink(LINK, { actor: ACTOR, context: CONTEXT });
        }).then(function (statement) {
            _this.assert(ACTOR === statement.actor);
            _this.assert(CONTEXT === statement.context);
            _this.assertStatement(statement);
        });
    };
    return Test;
}(BaseTest_1.default));
(new Test()).run();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Test;

//# sourceMappingURL=Service.test.js.map
