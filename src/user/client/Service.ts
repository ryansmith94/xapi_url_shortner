import BaseService from '../BaseService';
import * as q from 'q';

class Service extends BaseService {

  public createUser(email: string, password: string) {
    return this.validateEmail(email).then(function () {
      return this.repo.createUser({
        email: email,
        password: password
      });
    }.bind(this));
  }
}

export default Service;