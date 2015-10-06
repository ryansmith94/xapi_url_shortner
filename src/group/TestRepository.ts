/// <reference path="../definitions/references.d.ts" />
import q = require('q');

class Repository {
  private groups: Array<any> = [];

  public createGroup(group) {
    group.id = this.groups.length + 1;
    this.groups.push(group);
    return q(group);
  }

  public getGroupById(id) {
    var deferred = q.defer();
    
    if (this.groups[id - 1]) {
      deferred.resolve(this.groups[id - 1]);
    } else {
      deferred.reject(new Error('No group'));
    }

    return deferred.promise;
  }

  public getGroups(id) {
    return q(this.groups);
  }
}

export = Repository;