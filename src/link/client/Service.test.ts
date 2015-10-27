import BaseTest = require('../BaseTest');
import Service = require('./Service');
import TestRepository = require('../TestRepository');

var LONG_URL = 'http://www.example.com';
var SHORT_URL = '2';
class Test extends BaseTest {
  protected name: string = 'link/client/ServiceTest';
  protected service: Service;

  public beforeEach() {
    this.service = new Service(new TestRepository());
  }

  public testCreateLink(assert, done) {
    this.service.createLink(LONG_URL).then(function (link: any) {
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
    this.service.createLink(LONG_URL, SHORT_URL).then(function (link: any) {
      assert.equal(link.long_url, LONG_URL);
      assert.equal(link.short_url, SHORT_URL);
    }).then(done, done);
  }

  public testCreateLinkWithInvalidShortUrl(assert, done) {
    this.service.createLink(LONG_URL, 'AAA').then(function (link: any) {
      assert.equal(true, false);
    }, function (err) {
      assert.equal(true, true)
    }).then(done, done);
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
    this.service.createLink(LONG_URL, '2').then(function (link) {
      return this.service.getLinks().then(function (links) {
        assert.equal(Array.isArray(links), true);
        assert.equal(links.length, 1);
        assert.equal(links[0].id, link.id);
        assert.equal(links[0].long_url, link.long_url);
        assert.equal(links[0].short_url, link.short_url);
      });
    }.bind(this)).then(done, done);
  }

  public testDeleteLinkById(assert, done) {
    this.service.createLink(LONG_URL).then(function (link: any) {
      return this.service.deleteLinkById(link.id);
    }.bind(this)).then(function () {
      assert.equal(true, true);
    }, function (err) {
      assert.equal(false, true);
    }).then(done, done);
  }

  public testDeleteLinkByInvalidId(assert, done) {
    this.service.deleteLinkById(1).then(function () {
      assert.equal(true, false);
    }, function (err) {
      assert.equal(false, false);
    }).then(done, done);
  }
}

(new Test()).run();
export = Test;