'use strict';

require('should');
var combo = require('..');

describe('combo-url', function() {

  it('isCombo', function() {
    combo.isCombo('').should.be.false;
    combo.isCombo('http://localhost??a.js').should.be.true;
    combo.isCombo('http://localhost/??a.js').should.be.true;
    combo.isCombo('http://localhost??a.js,b.js').should.be.true;
    combo.isCombo('http://localhost??a.js?c.js,b.js').should.be.true;
    combo.isCombo('http://localhost/c??a.js').should.be.true;
    combo.isCombo('http://localhost/c/d/??a.js').should.be.true;
    combo.isCombo('http://localhost?a.js').should.be.false;
    combo.isCombo('http://localhost/a/b.js').should.be.false;
    combo.isCombo('http://localhost?a.js?b.js');
  });

  describe('resolve', function() {

    it('should return null when not combo url', function() {
      (combo.resolve('http://localhost/a?a.js') === null).should.be.true;
    });

    it('should return combo url', function() {
      combo.resolve('http://localhost/??a.js,b.js').should.eql({
        host: 'http://localhost',
        url: ['/a.js', '/b.js']
      });
    });

    it('should return combo url when has path', function() {
      combo.resolve('http://localhost:80/c/d??a.js,b.js').should.eql({
        host: 'http://localhost:80',
        url: ['/c/d/a.js', '/c/d/b.js']
      });
    });

    it('should return combo url when has querystring', function() {
      combo.resolve('http://localhost/??a.js?123%,b.js?456&input_encoding=utf-8').should.eql({
        host: 'http://localhost',
        url: ['/a.js', '/b.js']
      });

      combo.resolve('http://localhost/??a.js&input_encoding=utf-8,b.js?456').should.eql({
        host: 'http://localhost',
        url: ['/a.js']
      });
    });
  });
});
