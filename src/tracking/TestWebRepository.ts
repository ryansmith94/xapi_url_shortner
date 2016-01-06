import * as q from 'q';

class Repository {

  public getTitle(url) {
    return q(url);
  }
}

export default Repository;