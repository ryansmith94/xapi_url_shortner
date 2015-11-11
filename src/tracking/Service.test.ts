import BaseTest = require('../BaseTest');
import TestFactory = require('./TestFactory');
import GroupService = require('../group/Service');
import GroupTestRepository = require('../group/TestRepository');

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

class Test extends BaseTest {
  protected name: string = 'tracking/ServiceTest';
  protected service;
  protected group_service: GroupService;

  public beforeEach() {
    this.group_service = new GroupService(new GroupTestRepository());
    this.service = TestFactory();
    this.service.setGroupService(this.group_service);
  }

  private assertStatement(statement) {
    this.assert(LINK.long_url === statement.object.id);
    this.assert('http://localhost:3000/' + LINK.short_url === statement.object.definition.moreInfo);
    this.assert(LINK.long_url === statement.object.definition.name['en-GB']);
    this.assert(String(LINK.user_id) === statement.context.instructor.account.name);
    this.assert(GROUP.verb_id === statement.verb.id);
    this.assert(!!statement.verb.display[GROUP.verb_lang]);
    this.assert(GROUP.verb_display === statement.verb.display[GROUP.verb_lang]);
  }

  private createGroup() {
    return this.group_service.createGroup(
      GROUP.name,
      GROUP.verb_id,
      GROUP.verb_lang,
      GROUP.verb_display
    );
  }

  public testTrackLinkNoOptions() {
    return this.createGroup().then((group) => {
      LINK.group_id = group.id;
      return this.service.trackLink(LINK, null);
    }).then(this.assertStatement.bind(this));
  }

  public testTrackLinkWithActor() {
    return this.createGroup().then((group) => {
      LINK.group_id = group.id;
      return this.service.trackLink(LINK, { actor: ACTOR });
    }).then((statement) => {
      this.assert(ACTOR === statement.actor);
      this.assertStatement(statement);
    });
  }

  public testTrackLinkWithContext() {
    return this.createGroup().then((group) => {
      LINK.group_id = group.id;
      return this.service.trackLink(LINK, { context: CONTEXT });
    }).then((statement) => {
      this.assert(CONTEXT === statement.context);
      this.assertStatement(statement);
    });
  }

  public testTrackLinkWithActorAndContext() {
    return this.createGroup().then((group) => {
      LINK.group_id = group.id;
      return this.service.trackLink(LINK, { actor: ACTOR, context: CONTEXT });
    }).then((statement) => {
      this.assert(ACTOR === statement.actor);
      this.assert(CONTEXT === statement.context);
      this.assertStatement(statement);
    });
  }
}

(new Test()).run();
export = Test;