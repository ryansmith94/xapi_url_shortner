/// <reference path="../definitions/references.d.ts" />
import q = require('q');

class Repository {
  private groups: Array<any> = [];

  public createGroup(group) {
    group.id = this.groups.length + 1;
    this.groups.push(group);
    return q(group);
  }
}

export = Repository;