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

  public getGroups() {
    return q(this.groups);
  }

  public deleteGroupById(id) {
    var deferred = q.defer();
    var filtered_groups = this.groups.filter(function (group, index) {
      group.index = index;
      return group.id === id;
    });

    if (filtered_groups.length > 0) {
      this.groups = this.groups.slice(0, filtered_groups[0].index).concat(
        this.groups.slice(filtered_groups[0].index + 1)
      );
      deferred.resolve(true);
    } else {
      deferred.reject(new Error('No group'));
    }

    return deferred.promise;
  }
}

export = Repository;