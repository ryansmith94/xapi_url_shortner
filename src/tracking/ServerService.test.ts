import BaseTest = require('../BaseTest');
import Service = require('./ServerService');
import TestLrsRepository = require('./TestLrsRepository');
import TestWebRepository = require('./TestWebRepository');

var LINK = {
  id: '1',
  long_url: 'http://www.example.com',
  short_url: '1'
};
class Test extends BaseTest {
  protected name: string = 'tracking/ServerServiceTest';
  protected service: Service;

  public beforeEach() {
    this.service = new Service(new TestLrsRepository(), new TestWebRepository());
  }

  public testTrackLink(assert, done) {
    this.service.trackLink(LINK).then(function (statement) {
      assert.equal(statement.object.id, LINK.long_url);
      assert.equal(statement.object.definition.extensions['https://github.com/ryansmith94/xapi_url_shortner/extensions/short_url'], LINK.short_url);
      assert.equal(statement.object.definition.name['en-GB'],  LINK.long_url);
    }).then(done, done);
  }
}

(new Test()).run();
export = Test;