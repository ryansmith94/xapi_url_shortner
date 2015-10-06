/// <reference path="./definitions/references.d.ts" />
import chai = require('chai');
import source_map_support = require('source-map-support');

source_map_support.install({
  handleUncaughtExceptions: false
});

class TestCase {
  protected name: string = 'TestCase';

  public run() {
    describe(this.name, function () {
      var keys = [];
      for (var key in this) {
        keys.push(key);
      }

      var tests = keys.filter(function (key) {
        return key.indexOf('test') === 0;
      });

      tests.forEach(function (test) {
        beforeEach(this.beforeEach.bind(this));
        it(test, function (done) {
          return this[test](chai.assert, done);
        }.bind(this));
        afterEach(this.afterEach.bind(this));
      }.bind(this));
    }.bind(this));
  }

  public beforeEach() {}
  public afterEach() {}

  protected match(act: Array<any>, exp: Array<any>) {
    act.forEach(function (val: any, index: number) {
      chai.assert.equal(act[index], exp[index]);
    });
    exp.forEach(function (val: any, index: number) {
      chai.assert.equal(act[index], exp[index]);
    });
  }
}

export = TestCase;