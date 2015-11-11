import BaseTest = require('../BaseTest');
import Service = require('./Service');
import TestRepository = require('./TestRepository');
import UserService = require('../user/server/Service');
import UserTestRepository = require('../user/TestRepository');
import TokenService = require('../token/server/Service');
import TokenTestRepository = require('../token/server/TestRepository');
import LinkService = require('../link/server/Service');
import LinkTestRepository = require('../link/TestRepository');
import TrackingService = require('../tracking/Service');
import TrackingTestLrsRepository = require('../tracking/TestLrsRepository');
import TrackingTestWebRepository = require('../tracking/TestWebRepository');
import q = require('q');

var NAME = 'Example'
class Test extends BaseTest {
  protected name: string = 'group/ServiceTest';
  protected service: Service;
  protected user_service: UserService;
  protected token_service: TokenService;
  protected link_service: LinkService;
  protected tracking_service: TrackingService;

  public beforeEach() {
    this.service = new Service(new TestRepository());
    this.user_service = new UserService(new UserTestRepository());
    this.token_service = new TokenService(new TokenTestRepository());
    this.link_service = new LinkService(new LinkTestRepository());
    this.tracking_service = new TrackingService(
      new TrackingTestLrsRepository(),
      new TrackingTestWebRepository()
    );

    this.user_service.setGroupService(this.service);
    this.user_service.setTokenService(this.token_service);
    this.service.setUserService(this.user_service);
    this.service.setLinkService(this.link_service);
    this.token_service.setUserService(this.user_service);
    this.link_service.setTokenService(this.token_service);
    this.link_service.setTrackingService(this.tracking_service);
    this.link_service.setGroupService(this.service);
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

  public testGetGroupByInvalidId(assert, done) {
    this.service.getGroupById(1).then(function() {
      assert.equal(true, false);
    }, function () {
      assert.equal(false, false);
    }).then(done, done);
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

  public testDeleteGroupById(assert, done) {
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
      results.forEach(function(result) {
        assert.equal(result.state === 'fulfilled', false);
      });
    }).then(done, done);
  }

  public testDeleteGroupByInvalidId(assert, done) {
    this.service.deleteGroupById(1).then(function() {
      assert.equal(true, false);
    }, function() {
      assert.equal(false, false);
    }).then(done, done);
  }

  private createGroup() {
    var group, user;
    return this.service.createGroup(NAME).then(function (created_group) {
      group = created_group;
      return this.user_service.createUser('test@example.com', 'pass', group.id);
    }.bind(this)).then(function(created_user) {
      user = created_user;
      return this.token_service.createToken(user.email, 'pass');
    }.bind(this)).then(function(token) {
      return this.link_service.createLinkWithToken('http://example.com', token.value);
    }.bind(this)).then(function(link) {
      return { group: group, user: user, link: link };
    });
  }
}

(new Test()).run();
export = Test;