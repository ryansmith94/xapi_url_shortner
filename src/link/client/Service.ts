import BaseService = require('../BaseService');

class Service extends BaseService {

  /**
   * Constructs a new Service.
   * @param {any} repository A repository.
   */
  public constructor(repository: any) {
    super(repository);
  }
}

export = Service;