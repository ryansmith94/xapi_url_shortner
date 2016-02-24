import BaseService from '../BaseService';
import * as q from 'q';

class Service extends BaseService {
  protected repo;

  /**
   * Constructs a new Service.
   * @param {any} repository A repository.
   */
  public constructor(repository: any) {
    super();
    this.repo = repository;
  }
  
}

export default Service;