import BaseService = require('../BaseService');
import q = require('q');

class Service extends BaseService {
  protected repo;

  /**
   * Constructs a new Service.
   * @param {any} repository A repository.
   */
  public constructor(repository: any) {
    this.repo = repository;
    super();
  }
  
}

export = Service;