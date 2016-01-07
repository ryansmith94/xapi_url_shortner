import BaseService from '../BaseService';
import * as q from 'q';

const EXPIRY_TIME = 120; // Minutes.
class Service extends BaseService {
  private user_service;

  public setUserService(user_service) {
    this.user_service = user_service
  }

  public createToken(email: string, password: string) {
    return this.user_service.getUserByEmailAndPassword(email, password).then((user) => {
      let expiry = new Date();
      expiry.setMinutes(expiry.getMinutes() + EXPIRY_TIME);

      return this.repo.createToken({
        value: Math.random().toString(36).substr(2),
        user_id: user.id,
        expiry: expiry.toISOString()
      });
    }).then((token) => {
      return token;
    });
  }

  public getUserByValue(token_value: string) {
    return this.repo.getTokenByValue(token_value).then((token) => {
      if ((new Date()).toISOString() < token.expiry) {
        return token.user_id;
      } else {
        throw new Error('No token. Log out and log back in.');
      }
    });
  }
}

export default Service;