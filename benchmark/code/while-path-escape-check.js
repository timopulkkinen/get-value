
var isObject = require('isobject');

module.exports = function getValue(o, prop) {
  if (o == null || !isObject(o)) {
    return {};
  }
  if (prop == null) {
    return o;
  }

  var path;

  if (/\\\./.test(prop)) {
    prop = prop.replace(/\\\./g, '___DOT___');
    path = prop.split('.').map(function (seg) {
      return seg.replace(/___DOT___/g, '.');
    });
  } else {
    path = prop.split('.');
  }

  var last = path.pop();
  var len = path.length;

  for (var i = 0; i < len; i++) {
    var key = path[i];
    o = o[key];
    if (o == null) {
      return {};
    }
  }
  return o[last];
};
