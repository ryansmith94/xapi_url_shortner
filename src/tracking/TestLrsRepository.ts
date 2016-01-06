import * as q from 'q';

class Repository {

  public createStatement(statement) {
    return q(statement);
  }
}

export default Repository;