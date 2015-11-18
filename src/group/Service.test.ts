import BaseTest = require('../BaseTest');
import Factory = require('./TestFactory');
import UserFactory = require('../user/server/TestFactory');
import TokenFactory = require('../token/server/TestFactory');
import LinkFactory = require('../link/server/TestFactory');
import q = require('q');

var NAME = 'Example'
class Test extends BaseTest {
  protected name: string = __filename;
  protected service;
  protected user_service;
  protected token_service;
  protected link_service;

  public beforeEach() {
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
  }

  public testCreateGroup() {
    return this.service.createGroup(NAME).then((group) => {
      this.assert(group.name === NAME);
      this.assert(group.verb_id === 'http://adlnet.gov/expapi/verbs/launched');
      this.assert(group.verb_lang === 'en');
      this.assert(group.verb_display === 'launched');
    });
  }

  public testCreateGroupWithVerbOptions() {
    var VERB_ID = 'http://www.example.com/verb_id';
    var VERB_LANG = 'en-GB';
    var VERB_DISPLAY = 'verb_display';
    return this.service.createGroup(NAME, VERB_ID, VERB_LANG, VERB_DISPLAY).then((group) => {
      this.assert(group.name === NAME);
      this.assert(group.verb_id === VERB_ID);
      this.assert(group.verb_lang === VERB_LANG);
      this.assert(group.verb_display === VERB_DISPLAY);
    });
  }

  public testGetGroupById() {
    return this.service.createGroup(NAME).then((created_group) => {
      return this.service.getGroupById(created_group.id).then((group) => {
        this.assert(group.id === created_group.id);
      });
    });
  }

  public testGetGroupByInvalidId() {
    return this.service.getGroupById(1).then(this.fail(), this.pass());
  }

  public testGetGroups() {
    return this.service.createGroup(NAME).then((created_group) => {
      return this.service.getGroups().then((groups) => {
        this.assert(groups.length === 1);
        this.assert(groups[0].id === created_group.id);
        this.assert(groups[0].name === created_group.name);
      });
    });
  }

  public testDeleteGroupById() {
    var models;
    return this.createGroup().then((created_models) => {
      models = created_models;
      return this.service.deleteGroupById(models.group.id);
    }).then((result) => {
      this.assert(result === true);
      return q.allSettled([
        this.user_service.getUserById(models.user.id),
        this.service.getGroupById(models.group.id)
      ]);
    }).then((results) => {
      results.forEach((result) => {
        this.assert(result.state !== 'fulfilled');
      });
    });
  }

  public testDeleteGroupByInvalidId() {
    return this.service.deleteGroupById(1).then(this.fail(), this.pass());
  }

  private createGroup() {
    var group, user;
    return this.service.createGroup(NAME).then((created_group) => {
      group = created_group;
      return this.user_service.createUser('test@example.com', 'pass', group.id);
    }).then((created_user) => {
      user = created_user;
      return this.token_service.createToken(user.email, 'pass');
    }).then((token) => {
      return this.link_service.createLinkWithToken('http://example.com', token.value);
    }).then((link) => {
      return { group: group, user: user, link: link };
    });
  }
}

(new Test()).run();
export = Test;