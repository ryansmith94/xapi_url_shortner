import BaseTest from '../../BaseTest';
import Factory from './TestFactory';
import GroupFactory from '../../group/TestFactory';
import * as passhash from 'password-hash';

var EMAIL = 'test@example.com';
var PASSWORD = 'password';
var GROUP_NAME = 'Test group';
var GROUP_ID = 1;
class Test extends BaseTest {
  protected name: string = __filename;
  protected service;
  protected group_service;
  protected token_service;

  public beforeEach() {
    // Initialises services.
    this.group_service = GroupFactory();
    this.service = Factory();

    // Injects services into services.
    this.service.setGroupService(this.group_service);
  }

  private createUser(id = '') {
    var user_email = id+'test@example.com';
    var user_pass = 'test_password';
    var group_name = 'GROUP_NAME';
    return this.group_service.createGroup(group_name).then((group) => {
      return this.service.createUser(user_email, user_pass, group.id);
    });
  }

  public testCreateUser() {
    return this.group_service.createGroup(GROUP_NAME).then((group: any) => {
      return this.service.createUser(EMAIL, PASSWORD, group.id).then((user: any) => {
        this.assert(user.email === EMAIL);
        this.assert(passhash.verify(PASSWORD, user.password));
        this.assert(user.group_id === group.id);
        this.assert(user.admin === false);
      });
    });
  }

  public testCreateUserWithInvalidEmail() {
    return this.group_service.createGroup(GROUP_NAME).then((group: any) => {
      return this.service.createUser('invalid_email', PASSWORD, group.id);
    }).then(this.fail(), this.pass());
  }

  public testCreateUserWithInvalidGroupId() {
    return this.service.createUser(EMAIL, PASSWORD, GROUP_ID).then(this.fail(), this.pass());
  }

  public testCreateUserThatExistsInGroup() {
    return this.group_service.createGroup(GROUP_NAME).then((group: any) => {
      return this.service.createUser(EMAIL, PASSWORD, group.id).then((existing_user) => {
        return this.service.createUser(EMAIL, PASSWORD, group.id).then(this.fail(), this.pass());
      });
    });
  }

  public testGetUserByEmailAndPassword() {
    return this.group_service.createGroup(GROUP_NAME).then((group: any) => {
      return this.service.createUser(EMAIL, PASSWORD, group.id).then((existing_user: any) => {
        return this.service.getUserByEmailAndPassword(EMAIL, PASSWORD).then((user) => {
          this.assert(user.id === existing_user.id);
          this.assert(user.email === EMAIL);
          this.assert(passhash.verify(PASSWORD, user.password));
          this.assert(user.admin === false);
        });
      });
    });
  }

  public testGetUserByEmailAndPasswordWithNoUser() {
    return this.service.getUserByEmailAndPassword(EMAIL, PASSWORD).then(this.fail(), this.pass());
  }

  public testGetUserByIdWithNoUser() {
    return this.service.getUserById(1).then(this.fail(), this.pass());
  }

  public testDeleteUserById() {
    var group_id, user_id;

    return this.group_service.createGroup(GROUP_NAME).then((group: any) => {
      group_id = group.id
      return this.service.createUser(EMAIL, PASSWORD, group_id);
    }).then((user) => {
      user_id = user.id
      return this.service.deleteUserById(user_id);
    }).then(() => {
      return this.service.getUserById(user_id);
    }).then(this.fail(), this.pass());
  }

  public testDeleteUserByIdWithNoUser() {
    return this.service.deleteUserById(1).then(this.fail(), this.pass());
  }

  public testCreateUserWithUser() {
    return this.createUser('1').then((user: any) => {
      return this.service.createUserWithUser(EMAIL, PASSWORD, user.id);
    }).then((user: any) => {
      this.assert(user.email === EMAIL);
      this.assert(passhash.verify(PASSWORD, user.password));
      this.assert(user.admin === false);
    });
  }

  public testCreateUserWithUserAndInvalidEmail() {
    return this.createUser('1').then((user: any) => {
      return this.service.createUserWithUser('invalid email', PASSWORD, user.id);
    }).then(this.fail(), this.pass());
  }

  public testCreateUserWithUserThatExists() {
    return this.createUser().then((user: any) => {
      return this.service.createUserWithUser(EMAIL, PASSWORD, user.id);
    }).then(this.fail(), this.pass());
  }

  public testGetUsersWithGroupId() {
    return this.group_service.createGroup(GROUP_NAME).then((group: any) => {
      return this.service.createUser(EMAIL, PASSWORD, group.id);
    }).then((user) => {
      return this.service.getUsersByGroupId(user.group_id);
    }).then((users) => {
      this.assert(Array.isArray(users));
      this.assert(users.length === 1);
      this.assert(users[0].email === EMAIL);
    });
  }

  public testGetUsersWithInvalidGroupId() {
    return this.service.getUsersByGroupId(GROUP_ID).then(this.fail(), this.pass());
  }

  public testDeleteUsersByGroupId() {
    var group_id, user_id;

    return this.group_service.createGroup(GROUP_NAME).then((group: any) => {
      group_id = group.id
      return this.service.createUser(EMAIL, PASSWORD, group_id);
    }).then((user) => {
      user_id = user.id
      return this.service.deleteUsersByGroupId(group_id);
    }).then(() => {
      return this.service.getUserById(user_id);
    }).then(this.fail(), this.pass());
  }

  public testDeleteUsersByInvalidGroupId() {
    return this.service.deleteUsersByGroupId(1).then(this.fail(), this.pass());
  }

  public testCreateAdmin() {
    return this.createUser().then((user) => {
      return this.service.createAdmin(user.id);
    }).then((user) => {
      this.assert(user.admin === true);
    });
  }
}

(new Test()).run();
export default Test;