var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseTest = require('../BaseTest');
var Service = require('./Service');
var TestRepository = require('./TestRepository');
var NAME = 'Example';
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.apply(this, arguments);
        this.name = 'group/ServiceTest';
    }
    Test.prototype.beforeEach = function () {
        this.service = new Service(new TestRepository());
    };
    Test.prototype.testCreateGroup = function (assert, done) {
        this.service.createGroup(NAME).then(function (group) {
            assert.equal(group.name, NAME);
        }).then(done, done);
    };
    Test.prototype.testGetGroupById = function (assert, done) {
        this.service.createGroup(NAME).then(function (created_group) {
            return this.service.getGroupById(created_group.id).then(function (group) {
                assert.equal(group.id, created_group.id);
            });
        }.bind(this)).then(done, done);
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
    return Test;
})(BaseTest);
(new Test()).run();
module.exports = Test;
//# sourceMappingURL=Service.test.js.map