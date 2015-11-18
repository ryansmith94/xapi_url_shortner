/// <reference path="./definitions/references.d.ts" />
import chai = require('chai');
import source_map_support = require('source-map-support');

source_map_support.install({
  handleUncaughtExceptions: false
});

abstract class TestCase {
  protected name: string = __filename;

  /**
   * Runs the tests.
   */
  public run() {
    describe(this.name, () => {
      var keys = [];
      for (var key in this) {
        keys.push(key);
      }

      var tests = keys.filter(function (key) {
        return key.indexOf('test') === 0;
      });

      tests.forEach(this.runTest.bind(this));
    });
  }

  /**
   * Runs a single test.
   * @param {string} test Name of the test to run.
   */
  private runTest(test: string) {
    beforeEach(this.beforeEach.bind(this));
    it(test, (done) => {
      return this[test]().then(done, done);
    });
    afterEach(this.afterEach.bind(this));
  }

  /**
   * Defines things to be done before each test.
   */
  public beforeEach() {}

  /**
   * Defines things to be done after each test.
   */
  public afterEach() {}

  /**
   * Asserts that a condition is true.
   * @param {boolean} condition The condition to assert.
   * @param {string} message The message to display when the condition is false.
   */
  protected assert(condition: boolean, message?: string) {
    chai.assert.equal(condition == true, true, message);
  }

  /**
   * Passes an assertion.
   */
  protected pass() {
    return () => this.assert(true);
  }

  /**
   * Fails an assertion.
   */
  protected fail() {
    return () => this.assert(false, 'Fail');
  }
}

export = TestCase;