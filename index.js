'use strict';

var path = require('path');
var parse = require('url').parse;

exports.isCombo = function(url) {
  if (!url) return false;
  return url.indexOf('??') > -1;
};

exports.resolve = function(url) {
  if (!exports.isCombo(url)) return null;

  url = parse(url);
  var ret = {host: url.protocol + '//' + url.host};
  var comboPath = extractComboPath(url.query);
  ret.url = comboPath
  .split(',')
  .map(function(item) {
    item = parse(item).pathname;
    return path.join(url.pathname, item);
  });
  return ret;
};

// ??a.js,b.js&c=d => a.js,b.js
function extractComboPath(query) {
  var ret;
  query.split('&')
  .forEach(function(item) {
    item = decode(item);
    if (!ret && item.charAt(0) === '?') {
      ret = item.substring(1).split('=')[0];
    }
  });
  return ret;
}

function decode(url) {
  console.log(url)
  try {
    return decodeURIComponent(url);
  } catch(e) {
    return url;
  }
}
