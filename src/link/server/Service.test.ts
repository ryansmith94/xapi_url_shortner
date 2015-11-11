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
  protected user_service: UserService;
  protected token_service: TokenService;
  protected tracking_service: TrackingService;

  public beforeEach() {
    // Initialises services.
    this.tracking_service = new TrackingService(
      new TrackingTestLrsRepository(),
      new TrackingTestWebRepository()
    );
    this.group_service = new GroupService(new GroupTestRepository());
    this.token_service = new TokenService(new TokenTestRepository());
    this.user_service = new UserService(new UserTestRepository());
    this.service = new Service(new TestRepository());

    // Injects services into services.
    this.user_service.setGroupService(this.group_service);
    this.user_service.setTokenService(this.token_service);
    this.token_service.setUserService(this.user_service);
    this.tracking_service.setGroupService(this.group_service);
    this.service.setTrackingService(this.tracking_service);
    this.service.setTokenService(this.token_service);
    this.service.setGroupService(this.group_service);
  }

  private createToken(id = '') {
    var user_email = id+'test@example.com';
    var user_pass = 'test_password';
    var group_name = 'GROUP_NAME';
    return this.group_service.createGroup(group_name).then((group) => {
      return this.user_service.createUser(user_email, user_pass, group.id);
    }).then((user) => {
      return this.token_service.createToken(user_email, user_pass);
    });
  }

  public testTrackLinkNoOptions() {
    return this.createToken().then((token) => {
      return this.service.createLinkWithToken(LONG_URL, token.value);
    }).then((link) => {
      return this.service.trackLink(link.short_url);
    }).then(() => null);
  }

  public testCreateLink() {
    var token;
    return this.createToken().then((new_token) => {
      token = new_token;
      return this.service.createLinkWithToken(LONG_URL, token.value);
    }).then((link) => {
      this.assert(link.long_url === LONG_URL);
      this.assert(link.user_id === token.user_id);
    });
  }

  public testCreateLinkInvalidLongUrl() {
    return this.createToken().then((token) => {
      return this.service.createLinkWithToken('', token.value);
    }).then(this.fail(), this.pass());
  }

  public testCreateLinkWithShortUrl() {
    return this.createToken().then((token) => {
      return this.service.createLinkWithToken(LONG_URL, token.value, SHORT_URL);
    }).then((link) => {
      this.assert(link.long_url === LONG_URL);
      this.assert(link.short_url === SHORT_URL);
    });
  }

  public testCreateLinkWithExistingShortUrl() {
    return this.createToken().then((token) => {
      return this.service.createLinkWithToken(LONG_URL, token.value, '2').then((first_link) => {
        return this.service.createLinkWithToken(LONG_URL+'/2', token.value).then((second_link) => {
          this.assert(second_link.short_url === String(first_link.id));
        });
      });
    });
  }

  public testCreateLinkWithShortUrlOfExistingId() {
    return this.createToken().then((token) => {
      return this.service.createLinkWithToken(LONG_URL, token.value).then((first_link) => {
        return this.service.createLinkWithToken(LONG_URL+'/2', token.value, ''+first_link.id).then(
          this.fail(), this.pass()
        );
      });
    });
  }

  public testGetLinksByUserId() {
    return this.createToken().then((token) => {
      return this.service.createLinkWithToken(LONG_URL, token.value, '2').then((link) => {
        return this.service.getLinksByToken(token.value).then((links) => {
          this.assert(Array.isArray(links));
          this.assert(links.length === 1);
          this.assert(links[0].id === link.id);
          this.assert(links[0].long_url === link.long_url);
          this.assert(links[0].short_url === link.short_url);
        });
      });
    });
  }

  public testGetLinksByUserIdFromOtherGroup() {
    return this.createToken().then((token) => {
      return this.service.createLinkWithToken(LONG_URL, token.value);
    }).then(() => {
      return this.createToken('2');
    }).then((token) => {
      return this.service.getLinksByToken(token.value);
    }).then((links) => {
      this.assert(Array.isArray(links));
      this.assert(links.length === 0);
    });
  }

  public testGetLinksByUserIdWithIncorrectId() {
    return this.service.createLinkWithToken(LONG_URL, '1').then(this.fail(), this.pass());
  }

  public testDeleteLinkByIdWithToken() {
    var token;
    return this.createToken().then((created_token) => {
      token = created_token;
      return this.service.createLinkWithToken(LONG_URL, token.value);
    }).then((link) => {
      return this.service.deleteLinkByIdWithToken(link.id, token.value);
    }).then(this.pass(), this.fail());
  }

  public testDeleteLinkByInvalidIdWithToken() {
    return this.createToken().then((token) => {
      return this.service.deleteLinkByIdWithToken(1, token.value);
    }).then(this.fail(), this.pass());
  }

  public testDeleteLinkByIdWithInvalidToken() {
    var link;
    return this.createToken().then((token) => {
      return this.service.createLinkWithToken(LONG_URL, token.value);
    }).then((created_link) => {
      link = created_link;
      return this.createToken('2');
    }).then((token) => {
      return this.service.deleteLinkByIdWithToken(link.id, token.value);
    }).then(this.fail(), this.pass());
  }

  public testDeleteLinksByGroupId() {
    var token;
    var user_email = 'test@example.com';
    var user_pass = 'test_password';

    return this.group_service.createGroup('GROUP_NAME').then((group) => {
      return this.user_service.createUser(user_email, user_pass, group.id);
    }).then((user) => {
      return this.token_service.createToken(user_email, user_pass);
    }).then((created_token) => {
      token = created_token;
      return this.service.createLinkWithToken(LONG_URL, token.value);
    }).then((link) => {
      return this.service.deleteLinksByGroupId(link.group_id);
    }).then(() => {
      return this.service.getLinksByToken(token.value);
    }).then((links) => {
      this.assert(links.length === 0);
    });
  }

  public testDeleteLinksByInvalidGroupId() {
    return this.service.deleteLinksByGroupId(1).then(this.fail(), this.pass());
  }
}

(new Test()).run();
export = Test;