import BaseTest = require('../BaseTest');
import BaseService = require('./BaseService');

var LONG_URL = 'http://www.example.com';
var SHORT_URL = '2';
class Test extends BaseTest {
  protected service: BaseService;
  public beforeEach() {}

  public testCreateLink(assert, done) {
    this.service.createLink(LONG_URL).then(function (link) {
      assert.equal(link.long_url, LONG_URL);
    }).then(done, done);
  }

  public testCreateLinkInvalidLongUrl(assert, done) {
    this.service.createLink('').then(function (link) {
      assert.equal(true, false);
    }, function (err) {
      assert.equal(true, true)
    }).then(done, done);
  }

  public testCreateLinkWithShortUrl(assert, done) {
    this.service.createLink(LONG_URL, SHORT_URL).then(function (link) {
      assert.equal(link.long_url, LONG_URL);
      assert.equal(link.short_url, SHORT_URL);
    }).then(done, done);
  }

  public testCreateLinkWithInvalidShortUrl(assert, done) {
    this.service.createLink(LONG_URL, 'AAA').then(function (link) {
      assert.equal(true, false);
    }, function (err) {
      assert.equal(true, true)
    }).then(done, done);
  }

  public testCreateLinkWithExistingShortUrl(assert, done) {
    this.service.createLink(LONG_URL, '2').then(function (first_link) {
      return this.service.createLink(LONG_URL+'/2').then(function (second_link) {
        assert.equal(second_link.short_url, first_link.id);
      });
    }.bind(this)).then(done, done);
  }

  public testCreateLinkWithShortUrlOfExistingId(assert, done) {
    this.service.createLink(LONG_URL).then(function (first_link) {
      return this.service.createLink(LONG_URL+'/2', '1').then(function () {
        assert.equal(true, false);
      }, function () {
        assert.equal(true, true);
      });
    }.bind(this)).then(done, done);
  }

  public testGetLinks(assert, done) {
    this.service.createLink(LONG_URL, '2').then(function (first_link) {
      return this.service.createLink(LONG_URL+'/2').then(function (second_link) {
        return this.service.getLinks().then(function (links) {
          assert.equal(Array.isArray(links), true);
          assert.equal(links[0].id, first_link.id);
          assert.equal(links[0].long_url, first_link.long_url);
          assert.equal(links[0].short_url, first_link.short_url);
          assert.equal(links[1].id, second_link.id);
          assert.equal(links[1].long_url, second_link.long_url);
          assert.equal(links[1].short_url, second_link.short_url);
        });
      }.bind(this));
    }.bind(this)).then(done, done);
  }
}

export = Test;