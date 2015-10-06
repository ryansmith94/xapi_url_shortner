import BaseTest = require('../BaseTest');
import Service = require('./Service');
import TestRepository = require('./TestRepository');

var NAME = 'Example'
class Test extends BaseTest {
  protected name: string = 'group/ServiceTest';
  protected service: Service;

  public beforeEach() {
    this.service = new Service(new TestRepository());
  }

  public testCreateGroup(assert, done) {
    this.service.createGroup(NAME).then(function (group) {
      assert.equal(group.name, NAME);
    }).then(done, done);
  }

  public testGetGroupById(assert, done) {
    this.service.createGroup(NAME).then(function (created_group) {
      return this.service.getGroupById(created_group.id).then(function (group) {
        assert.equal(group.id, created_group.id);
      });
    }.bind(this)).then(done, done);
  }

  public testGetGroups(assert, done) {
    this.service.createGroup(NAME).then(function (created_group) {
      return this.service.getGroups().then(function (groups) {
        assert.equal(groups.length, 1);
        assert.equal(groups[0].id, created_group.id);
        assert.equal(groups[0].name, created_group.name);
      });
    }.bind(this)).then(done, done);
  }
}

(new Test()).run();
export = Test;