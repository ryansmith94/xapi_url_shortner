import BaseTest = require('../BaseTest');
import Service = require('./Service');
import TestRepository = require('../TestRepository');
import TrackingService = require('../../tracking/Service');
import TrackingTestLrsRepository = require('../../tracking/TestLrsRepository');
import TrackingTestWebRepository = require('../../tracking/TestWebRepository');
import GroupService = require('../../group/Service');
import GroupTestRepository = require('../../group/TestRepository');
import UserService = require('../../user/server/Service');
import UserTestRepository = require('../../user/TestRepository');
import TokenService = require('../../token/server/Service');
import TokenTestRepository = require('../../token/server/TestRepository');

var LONG_URL = 'http://www.example.com';
var SHORT_URL = '2';
class Test extends BaseTest {
  protected name: string = 'link/server/ServiceTest';
  protected service: Service;
  protected group_service: GroupService;
  protected user_service: UserService
  protected token_service: TokenService;

  public beforeEach() {
    var tracking_service = new TrackingService(
      new TrackingTestLrsRepository(),
      new TrackingTestWebRepository()
    );
    this.group_service = new GroupService(new GroupTestRepository());
    this.token_service = new TokenService(new TokenTestRepository());
    this.user_service = new UserService(
      new UserTestRepository(),
      this.group_service,
      this.token_service
    );
    this.token_service.setUserService(this.user_service);
    this.service = new Service(new TestRepository(), tracking_service, this.token_service);
  }

  private createToken(id = '') {
    var user_email = id+'test@example.com';
    var user_pass = 'test_password';
    var group_name = 'GROUP_NAME';
    return this.group_service.createGroup(group_name).then(function (group) {
      return this.user_service.createUser(user_email, user_pass, group.id);
    }.bind(this)).then(function (user) {
      return this.token_service.createToken(user_email, user_pass);
    }.bind(this));
  }

  public testTrackLinkNoOptions(assert, done) {
    this.createToken().then(function (token) {
      return this.service.createLinkWithToken(LONG_URL, token.value);
    }.bind(this)).then(function (link) {
      return this.service.trackLink(link.short_url);
    }.bind(this)).then(function () {}).then(done, done);
  }

  public testCreateLink(assert, done) {
    var token;
    this.createToken().then(function (new_token) {
      token = new_token;
      return this.service.createLinkWithToken(LONG_URL, token.value);
    }.bind(this)).then(function (link) {
      assert.equal(link.long_url, LONG_URL);
      assert.equal(link.user_id, token.user_id);
    }).then(done, done);
  }

  public testCreateLinkInvalidLongUrl(assert, done) {
    this.createToken().then(function (token) {
      return this.service.createLinkWithToken('', token.value);
    }.bind(this)).then(function (link) {
      assert.equal(true, false);
    }, function (err) {
      assert.equal(true, true)
    }).then(done, done);
  }

  public testCreateLinkWithShortUrl(assert, done) {
    this.createToken().then(function (token) {
      return this.service.createLinkWithToken(LONG_URL, token.value, SHORT_URL);
    }.bind(this)).then(function (link) {
      assert.equal(link.long_url, LONG_URL);
      assert.equal(link.short_url, SHORT_URL);
    }).then(done, done);
  }

  public testCreateLinkWithExistingShortUrl(assert, done) {
    this.createToken().then(function (token) {
      return this.service.createLinkWithToken(LONG_URL, token.value, '2').then(function (first_link) {
        return this.service.createLinkWithToken(LONG_URL+'/2', token.value).then(function (second_link) {
          assert.equal(second_link.short_url, first_link.id);
        });
      }.bind(this));
    }.bind(this)).then(done, done);
  }

  public testCreateLinkWithShortUrlOfExistingId(assert, done) {
    this.createToken().then(function (token) {
      return this.service.createLinkWithToken(LONG_URL, token.value).then(function (first_link) {
        return this.service.createLinkWithToken(LONG_URL+'/2', token.value, ''+first_link.id).then(function () {
          assert.equal(true, false);
        }, function () {
          assert.equal(true, true);
        });
      }.bind(this));
    }.bind(this)).then(done, done);
  }

  public testGetLinksByUserId(assert, done) {
    this.createToken().then(function (token) {
      return this.service.createLinkWithToken(LONG_URL, token.value, '2').then(function (link) {
        return this.service.getLinksByToken(token.value).then(function (links) {
          assert.equal(Array.isArray(links), true);
          assert.equal(links.length, 1);
          assert.equal(links[0].id, link.id);
          assert.equal(links[0].long_url, link.long_url);
          assert.equal(links[0].short_url, link.short_url);
        });
      }.bind(this));
    }.bind(this)).then(done, done);
  }

  public testtestGetLinksByUserIdFromOtherGroup(assert, done) {
    this.createToken().then(function (token) {
      return this.service.createLinkWithToken(LONG_URL, token.value);
    }.bind(this)).then(function () {
      return this.createToken('2');
    }.bind(this)).then(function (token) {
      return this.service.getLinksByToken(token.value);
    }.bind(this)).then(function (links) {
      assert.equal(Array.isArray(links), true);
      assert.equal(links.length, 0);
    }.bind(this)).then(done, done);
  }

  public testtestGetLinksByUserIdWithIncorrectId(assert, done) {
    this.service.createLinkWithToken(LONG_URL, '1').then(function () {
      assert.equal(true, false);
    }, function () {
      assert.equal(false, false);
    }).then(done, done);
  }
}

(new Test()).run();
export = Test;