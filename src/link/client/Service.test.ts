import BaseTest = require('../BaseTest');
import Factory = require('./TestFactory');
import TestRepository = require('../TestRepository');

var LONG_URL = 'http://www.example.com';
var SHORT_URL = '2';
class Test extends BaseTest {
  protected name: string = __filename;
  protected service;

  public beforeEach() {
    this.service = Factory();
  }

  public testCreateLink() {
    return this.service.createLink(LONG_URL).then((link: any) => {
      this.assert(link.long_url === LONG_URL);
    });
  }

  public testCreateLinkInvalidLongUrl() {
    return this.service.createLink('').then(this.fail(), this.pass());
  }

  public testCreateLinkWithShortUrl() {
    return this.service.createLink(LONG_URL, SHORT_URL).then((link: any) => {
      this.assert(link.long_url === LONG_URL);
      this.assert(link.short_url === SHORT_URL);
    });
  }

  public testCreateLinkWithInvalidShortUrl() {
    return this.service.createLink(LONG_URL, 'AAA').then(this.fail(), this.pass());
  }

  public testCreateLinkWithShortUrlOfExistingId() {
    return this.service.createLink(LONG_URL).then((first_link) => {
      return this.service.createLink(LONG_URL + '/2', '1');
    }).then(this.fail(), this.pass());
  }

  public testGetLinks() {
    return this.service.createLink(LONG_URL, '2').then((link: any) => {
      return this.service.getLinks().then((links) => {
        this.assert(Array.isArray(links));
        this.assert(links.length === 1);
        this.assert(links[0].id === link.id);
        this.assert(links[0].long_url === link.long_url);
        this.assert(links[0].short_url === link.short_url);
      });
    });
  }

  public testDeleteLinkById() {
    return this.service.createLink(LONG_URL).then((link: any) => {
      return this.service.deleteLinkById(link.id);
    }).then(this.pass(), this.fail());
  }

  public testDeleteLinkByInvalidId() {
    return this.service.deleteLinkById(1).then(this.fail(), this.pass());
  }
}

(new Test()).run();
export = Test;