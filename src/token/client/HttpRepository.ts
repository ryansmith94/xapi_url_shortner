import BaseRepository from '../../BaseHttpRepository';
import * as q from 'q';

class Repository extends BaseRepository {
  private tokens: Array<any> = [];

  public constructor(endpoint) {
    super(endpoint);
  }

  public createToken(token) {
    return this.connect({
      method: 'POST',
      data: token
    }).then(function (token) {
      this.tokens.push(token);
      return token;
    }.bind(this));
  }

  public getTokenByValue(value: string) {
    return this.filterModels(this.tokens, function (token) {
      return token.value === value;
    });
  }
}

export default Repository;