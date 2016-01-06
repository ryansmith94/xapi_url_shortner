import BaseService from '../BaseService';
import * as q from 'q';

class Service extends BaseService {
  private user_service;

  public createToken(email: string, password: string) {
    return this.repo.createToken({
      email: email,
      password: password
    });
  }
}

export default Service;