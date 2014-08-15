'use strict';

var path = require('path');
var parse = require('url').parse;

exports.isCombo = function(url) {
  if (!url) return false;
  return url.indexOf('??') > -1;
};

exports.parse = function(url) {
  if (!exports.isCombo(url)) return null;

  url = parse(url);
  var comboPath = extractComboPath(url.query);
  url.combo = comboPath
  .split(',')
  .map(function(item) {
    item = parse(item).pathname;
    return path.join(url.pathname, item);
  });
  return url;
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
  try {
    return decodeURIComponent(url);
  } catch(e) {
    return url;
  }
}
