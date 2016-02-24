import BaseService from '../BaseService';
import * as q from 'q';

class Service extends BaseService {
  protected repo;

  public constructor(repository) {
    super();
    this.repo = repository;
  }

  protected validateEmail(email: string) {
    var deferred = q.defer();
    var email_regex = /^[A-Z0-9.\'_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!email_regex.test(email)) {
      deferred.reject(new Error('Invalid email'));
    } else {
      deferred.resolve(true);
    }

    return deferred.promise;
  }
}

export default Service;