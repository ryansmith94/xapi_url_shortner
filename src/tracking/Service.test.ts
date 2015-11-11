import BaseTest = require('../BaseTest');
import Service = require('./Service');
import TestLrsRepository = require('./TestLrsRepository');
import TestWebRepository = require('./TestWebRepository');
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
  protected service: Service;
  protected group_service: GroupService;

  public beforeEach() {
    this.group_service = new GroupService(new GroupTestRepository());
    this.service = new Service(new TestLrsRepository(), new TestWebRepository());
    this.service.setGroupService(this.group_service);
  }

  private assertStatement(assert, statement) {
    assert.equal(LINK.long_url, statement.object.id);
    assert.equal('http://localhost:3000/'+LINK.short_url, statement.object.definition.moreInfo);
    assert.equal(LINK.long_url, statement.object.definition.name['en-GB']);
    assert.equal(LINK.user_id, statement.context.instructor.account.name);
    assert.equal(GROUP.verb_id, statement.verb.id);
    assert.equal(!statement.verb.display[GROUP.verb_lang], false);
    assert.equal(GROUP.verb_display, statement.verb.display[GROUP.verb_lang]);
  }

  private createGroup() {
    return this.group_service.createGroup(
      GROUP.name,
      GROUP.verb_id,
      GROUP.verb_lang,
      GROUP.verb_display
    );
  }

  public testTrackLinkNoOptions(assert, done) {
    this.createGroup().then(function (group) {
      LINK.group_id = group.id;
      return this.service.trackLink(LINK, null);
    }.bind(this)).then(function (statement) {
      this.assertStatement(assert, statement);
    }.bind(this)).then(done, done);
  }

  public testTrackLinkWithActor(assert, done) {
    this.createGroup().then(function(group) {
      LINK.group_id = group.id;
      return this.service.trackLink(LINK, { actor: ACTOR });
    }.bind(this)).then(function(statement) {
      assert.equal(ACTOR, statement.actor);
      this.assertStatement(assert, statement);
    }.bind(this)).then(done, done);
  }

  public testTrackLinkWithContext(assert, done) {
    this.createGroup().then(function(group) {
      LINK.group_id = group.id;
      return this.service.trackLink(LINK, { context: CONTEXT });
    }.bind(this)).then(function(statement) {
      assert.equal(CONTEXT, statement.context);
      this.assertStatement(assert, statement);
    }.bind(this)).then(done, done);
  }

  public testTrackLinkWithActorAndContext(assert, done) {
    this.createGroup().then(function(group) {
      LINK.group_id = group.id;
      return this.service.trackLink(LINK, { actor: ACTOR, context: CONTEXT });
    }.bind(this)).then(function (statement) {
      assert.equal(ACTOR, statement.actor);
      assert.equal(CONTEXT, statement.context);
      this.assertStatement(assert, statement);
    }.bind(this)).then(done, done);
  }
}

(new Test()).run();
export = Test;