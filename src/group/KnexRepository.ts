import BaseRepository from '../BaseKnexRepository';

class Repository extends BaseRepository {

  public createGroup(group) {
    return this.connect().insert(group, 'id').then(function (ids) {
      return {
        id: ids[0],
        name: group.name,
        verb_id: group.verb_id,
        verb_lang: group.verb_lang,
        verb_display: group.verb_display
      };
    });
  }

  public getGroupById(id) {
    return this.connect().where('id', id).first().then(function (group) {
      if (!group) {
        throw new Error('No group');
      } else {
        return group;
      }
    });
  }

  public getGroups() {
    return this.connect().select();
  }

  public deleteGroupById(id) {
    return this.connect().where('id', id).delete().then(function (group) {
      if (!group) {
        throw new Error('No group');
      } else {
        return true;
      }
    });
  }
}

export default Repository;
