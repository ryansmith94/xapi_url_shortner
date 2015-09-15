var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest = require('../BaseTest');
var Service = require('./ServerService');
var TestLrsRepository = require('./TestLrsRepository');
var TestWebRepository = require('./TestWebRepository');
var LINK = {
    id: '1',
    long_url: 'http://www.example.com',
    short_url: '1'
};
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = 'tracking/ServerServiceTest';
    }
    Test.prototype.beforeEach = function () {
        this.service = new Service(new TestLrsRepository(), new TestWebRepository());
    };
    Test.prototype.testTrackLink = function (assert, done) {
        this.service.trackLink(LINK).then(function (statement) {
            assert.equal(statement.object.id, LINK.long_url);
            assert.equal(statement.object.definition.extensions['https://github.com/ryansmith94/xapi_url_shortner/extensions/short_url'], LINK.short_url);
            assert.equal(statement.object.definition.name['en-GB'], LINK.long_url);
        }).then(done, done);
    };
    return Test;
})(BaseTest);
(new Test()).run();
module.exports = Test;
