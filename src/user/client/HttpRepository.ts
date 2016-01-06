import BaseRepository from '../../BaseHttpRepository';
import * as q from 'q';

class Repository extends BaseRepository {
  private token_value;
  private users: Array<any>;

  public constructor(endpoint, token_value) {
    this.token_value = token_value;
    super(endpoint);
  }

  protected connect(opts) {
    opts.beforeSend = function (xhr) {
      xhr.setRequestHeader ('Authorization', 'Bearer '+this.token_value);
    }.bind(this);
    return super.connect(opts);
  }

  public createUser(user) {
    return this.connect({
      method: 'POST',
      data: user
    });
  }
}

export default Repository;