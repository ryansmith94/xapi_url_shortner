import BaseService = require('../BaseService');
import q = require('q');

class Service extends BaseService {
  private user_service;

  public constructor(repository) {
    super(repository);
  }

  public createToken(email: string, password: string) {
    return this.repo.createToken({
      email: email,
      password: password
    });
  }
}

export = Service;