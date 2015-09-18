import BaseTest = require('../BaseTest');
import Service = require('./Service');
import TestLrsRepository = require('./TestLrsRepository');
import TestWebRepository = require('./TestWebRepository');

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

class Test extends BaseTest {
  protected name: string = 'tracking/ServiceTest';
  protected service: Service;

  public beforeEach() {
    this.service = new Service(new TestLrsRepository(), new TestWebRepository());
  }

  private assertStatement(assert, statement) {
    assert.equal(LINK.long_url, statement.object.id);
    assert.equal('http://localhost:3000/'+LINK.short_url, statement.object.definition.moreInfo);
    assert.equal(LINK.long_url, statement.object.definition.name['en-GB']);
  }

  public testTrackLinkNoOptions(assert, done) {
    this.service.trackLink(LINK, null).then(function (statement) {
      this.assertStatement(assert, statement);
    }.bind(this)).then(done, done);
  }

  public testTrackLinkWithActor(assert, done) {
    this.service.trackLink(LINK, {actor: ACTOR}).then(function (statement) {
      assert.equal(ACTOR, statement.actor);
      this.assertStatement(assert, statement);
    }.bind(this)).then(done, done);
  }

  public testTrackLinkWithContext(assert, done) {
    this.service.trackLink(LINK, {context: CONTEXT}).then(function (statement) {
      assert.equal(CONTEXT, statement.context);
      this.assertStatement(assert, statement);
    }.bind(this)).then(done, done);
  }

  public testTrackLinkWithActorAndContext(assert, done) {
    this.service.trackLink(LINK, {actor: ACTOR, context: CONTEXT}).then(function (statement) {
      assert.equal(ACTOR, statement.actor);
      assert.equal(CONTEXT, statement.context);
      this.assertStatement(assert, statement);
    }.bind(this)).then(done, done);
  }
}

(new Test()).run();
export = Test;