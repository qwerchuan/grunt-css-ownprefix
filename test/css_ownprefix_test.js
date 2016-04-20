'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.css_ownprefix = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(2);

    var actualcss = grunt.file.read('tmp/main.css');
    var expectedcss = grunt.file.read('test/expected/main.css');
    test.equal(actualcss, expectedcss, 'css should describe what the default behavior is.');

    var actualhtml = grunt.file.read('tmp/index.html');
    var expectedhtml = grunt.file.read('test/expected/index.html');
    test.equal(actualhtml, expectedhtml, 'html should describe what the default behavior is.');

    test.done();
  },
  // custom_options: function(test) {
  //   test.expect(1);
  //
  //   var actual = grunt.file.read('tmp/custom_options');
  //   var expected = grunt.file.read('test/expected/custom_options');
  //   test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');
  //
  //   test.done();
  // }
};
