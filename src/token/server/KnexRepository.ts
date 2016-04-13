import BaseRepository from '../../BaseKnexRepository';

class Repository extends BaseRepository {

  public createToken(token) {
    return this.connect().insert(token, 'id').then(function (ids) {
      return {
        id: ids[0],
        value: token.value,
        user_id: token.user_id,
        expiry: token.expiry
      };
    });
  }

  public getTokenByValue(value: string) {
    return this.connect().where('value', value).first().then(function (token) {
      if (!token) {
        throw new Error('No token. Log out and log back in.');
      } else {
        return token;
      }
    });
  }
}

export default Repository;
