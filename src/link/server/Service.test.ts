import BaseTest from '../BaseTest';
import Factory from './TestFactory';
import TrackingFactory from '../../tracking/TestFactory';
import GroupFactory from '../../group/TestFactory';
import UserFactory from '../../user/server/TestFactory';

var LONG_URL = 'http://www.example.com';
var SHORT_URL = '2';
class Test extends BaseTest {
  protected name: string = __filename;
  protected service;
  protected group_service;
  protected user_service;
  protected tracking_service;

  public beforeEach() {
    // Initialises services.
    this.tracking_service = TrackingFactory();
    this.group_service = GroupFactory();
    this.user_service = UserFactory();
    this.service = Factory();

    // Injects services into services.
    this.user_service.setGroupService(this.group_service);
    this.tracking_service.setGroupService(this.group_service);
    this.service.setTrackingService(this.tracking_service);
    this.service.setGroupService(this.group_service);
    this.service.setUserService(this.user_service);
  }

  private createUser(id = '') {
    var user_email = id+'test@example.com';
    var user_pass = 'test_password';
    var group_name = 'GROUP_NAME';
    return this.group_service.createGroup(group_name).then((group) => {
      return this.user_service.createUser(user_email, user_pass, group.id);
    });
  }

  public testTrackLinkNoOptions() {
    return this.createUser().then((user) => {
      return this.service.createLink(LONG_URL, user.id);
    }).then((link) => {
      return this.service.trackLink(link.short_url);
    }).then(() => null);
  }

  public testCreateLink() {
    var user;
    return this.createUser().then((created_user) => {
      user = created_user;
      return this.service.createLink(LONG_URL, user.id);
    }).then((link) => {
      this.assert(link.long_url === LONG_URL);
      this.assert(link.user_id === user.id);
    });
  }

  public testCreateLinkInvalidLongUrl() {
    return this.createUser().then((user) => {
      return this.service.createLink('', user.id);
    }).then(this.fail(), this.pass());
  }

  public testCreateLinkWithShortUrl() {
    return this.createUser().then((user) => {
      return this.service.createLink(LONG_URL, user.id, SHORT_URL);
    }).then((link) => {
      this.assert(link.long_url === LONG_URL);
      this.assert(link.short_url === SHORT_URL);
    });
  }

  public testCreateLinkWithExistingShortUrl() {
    return this.createUser().then((user) => {
      return this.service.createLink(LONG_URL, user.id, '2').then((first_link) => {
        return this.service.createLink(LONG_URL+'/2', user.id).then((second_link) => {
          this.assert(second_link.short_url === String(first_link.id));
        });
      });
    });
  }

  public testCreateLinkWithShortUrlOfExistingId() {
    return this.createUser().then((user) => {
      return this.service.createLink(LONG_URL, user.id).then((first_link) => {
        return this.service.createLink(LONG_URL+'/2', user.id, ''+first_link.id).then(
          this.fail(), this.pass()
        );
      });
    });
  }

  public testGetLinks() {
    return this.createUser().then((user) => {
      return this.service.createLink(LONG_URL, user.id, '2').then((link) => {
        return this.service.getLinks(user.id).then((links) => {
          this.assert(Array.isArray(links));
          this.assert(links.length === 1);
          this.assert(links[0].id === link.id);
          this.assert(links[0].long_url === link.long_url);
          this.assert(links[0].short_url === link.short_url);
        });
      });
    });
  }

  public testGetLinksFromOtherGroup() {
    return this.createUser().then((user) => {
      return this.service.createLink(LONG_URL, user.id);
    }).then(() => {
      return this.createUser('2');
    }).then((user) => {
      return this.service.getLinks(user.id);
    }).then((links) => {
      this.assert(Array.isArray(links));
      this.assert(links.length === 0);
    });
  }

  public testGetLinksWithIncorrectId() {
    return this.service.getLinks(1).then(this.fail(), this.pass());
  }

  public testDeleteLinkById() {
    var user;
    return this.createUser().then((created_user) => {
      user = created_user;
      return this.service.createLink(LONG_URL, user.id);
    }).then((link) => {
      return this.service.deleteLinkById(link.id, user.id);
    }).then(this.pass(), this.fail());
  }

  public testDeleteLinkByInvalidId() {
    return this.createUser().then((user) => {
      return this.service.deleteLinkById(1, user.id);
    }).then(this.fail(), this.pass());
  }

  public testDeleteLinkByIdWithInvalidUser() {
    var link;
    return this.createUser().then((user) => {
      return this.service.createLink(LONG_URL, user.id);
    }).then((created_link) => {
      link = created_link;
      return this.createUser('2');
    }).then((user) => {
      return this.service.deleteLinkById(link.id, user.id);
    }).then(this.fail(), this.pass());
  }

  public testDeleteLinksByGroupId() {
    var user;
    var user_email = 'test@example.com';
    var user_pass = 'test_password';

    return this.createUser().then((created_user) => {
      user = created_user;
      return this.service.createLink(LONG_URL, user.id);
    }).then((link) => {
      return this.service.deleteLinksByGroupId(link.group_id);
    }).then(() => {
      return this.service.getLinks(user.id);
    }).then((links) => {
      this.assert(links.length === 0);
    });
  }

  public testDeleteLinksByInvalidGroupId() {
    return this.service.deleteLinksByGroupId(1).then(this.fail(), this.pass());
  }

  public testChangeLongUrl() {
    let user, link;
    const NEW_LONG_URL = LONG_URL + '/hello';
    let assertUpdated = (updated_link) => {
      this.assert(updated_link.id === link.id);
      this.assert(updated_link.long_url === NEW_LONG_URL);
      this.assert(updated_link.short_url === link.short_url);
      this.assert(updated_link.user_id === user.id);
      this.assert(updated_link.group_id === user.group_id);
    };

    return this.createUser().then((created_user) => {
      user = created_user;
      return this.service.createLink(LONG_URL, user.id);
    }).then((created_link) => {
      link = created_link;
      return this.service.changeLongUrl(link.id, NEW_LONG_URL, user.id);
    }).then((updated_link) => {
      assertUpdated(updated_link);
      return this.service.getLinkById(link.id, user.id);
    }).then((updated_link) => {
      assertUpdated(updated_link);
    });
  }

  public testChangeLongUrlWithInvalidId() {
    const NEW_LONG_URL = LONG_URL + '/hello';
    return this.createUser().then((user) => {
      return this.service.changeLongUrl(1, NEW_LONG_URL, user.id);
    }).then(this.fail(), this.pass());
  }

  public testChangeLongUrlWithInvalidLongUrl() {
    let user;
    const NEW_LONG_URL = '';
    return this.createUser().then((created_user) => {
      user = created_user;
      return this.service.createLink(LONG_URL, user.id);
    }).then((link) => {
      return this.service.changeLongUrl(link.id, NEW_LONG_URL, user.id);
    }).then(this.fail(), this.pass());
  }

  public testChangeLongUrlWithInvalidUserId() {
    const NEW_LONG_URL = '';
    return this.createUser().then((user) => {
      return this.service.createLink(LONG_URL, user.id);
    }).then((link) => {
      return this.service.changeLongUrl(link.id, NEW_LONG_URL, 100);
    }).then(this.fail(), this.pass());
  }
}

(new Test()).run();
export default Test;