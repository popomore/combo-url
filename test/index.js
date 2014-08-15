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

  describe('parse', function() {

    it('should return null when not combo url', function() {
      (combo.parse('http://localhost/a?a.js') === null).should.be.true;
    });

    it('should object parsed by `url`', function() {
      combo.parse('http://localhost/??a.js,b.js').should.eql({
        protocol: 'http:',
        slashes: true,
        auth: null,
        host: 'localhost',
        port: null,
        hostname: 'localhost',
        hash: null,
        search: '??a.js,b.js',
        query: '?a.js,b.js',
        pathname: '/',
        path: '/??a.js,b.js',
        href: 'http://localhost/??a.js,b.js',
        combo: ['/a.js', '/b.js']
      });
    });

    it('should return combo url when has path', function() {
      combo.parse('http://localhost:80/c/d??a.js,b.js').combo
        .should.eql(['/c/d/a.js', '/c/d/b.js']);
    });

    it('should return combo url when has querystring', function() {
      combo.parse('http://localhost/??a.js?123%,b.js?456&input_encoding=utf-8').combo
        .should.eql(['/a.js', '/b.js']);

      combo.parse('http://localhost/??a.js&input_encoding=utf-8,b.js?456').combo
        .should.eql(['/a.js']);
    });
  });
});
