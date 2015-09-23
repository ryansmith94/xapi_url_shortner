var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest = require('../BaseTest');
var Service = require('./Service');
var TestLrsRepository = require('./TestLrsRepository');
var TestWebRepository = require('./TestWebRepository');
var LINK = {
    id: '1',
    long_url: 'http://www.example.com',
    short_url: '1'
};
var ACTOR = {
    account: {
        homePage: 'http://www.example.com',
        name: '1'
    }
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
        this.service = new Service(new TestLrsRepository(), new TestWebRepository());
    };
    Test.prototype.assertStatement = function (assert, statement) {
        assert.equal(LINK.long_url, statement.object.id);
        assert.equal('http://localhost:3000/' + LINK.short_url, statement.object.definition.moreInfo);
        assert.equal(LINK.long_url, statement.object.definition.name['en-GB']);
    };
    Test.prototype.testTrackLinkNoOptions = function (assert, done) {
        this.service.trackLink(LINK, null).then(function (statement) {
            this.assertStatement(assert, statement);
        }.bind(this)).then(done, done);
    };
    Test.prototype.testTrackLinkWithActor = function (assert, done) {
        this.service.trackLink(LINK, { actor: ACTOR }).then(function (statement) {
            assert.equal(ACTOR, statement.actor);
            this.assertStatement(assert, statement);
        }.bind(this)).then(done, done);
    };
    Test.prototype.testTrackLinkWithContext = function (assert, done) {
        this.service.trackLink(LINK, { context: CONTEXT }).then(function (statement) {
            assert.equal(CONTEXT, statement.context);
            this.assertStatement(assert, statement);
        }.bind(this)).then(done, done);
    };
    Test.prototype.testTrackLinkWithActorAndContext = function (assert, done) {
        this.service.trackLink(LINK, { actor: ACTOR, context: CONTEXT }).then(function (statement) {
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