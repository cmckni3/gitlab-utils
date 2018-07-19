require('terminal-colors');

// color shortcuts
var colors = {
  error: function() {
    return this.underline.red;
  },
  warn: function() {
    return this.bold.yellow;
  },
  success: function() {
    return this.underline.green;
  },
  info: function() {
    return this.bold.blue;
  },
};

Object.keys(colors).forEach(function(level) {
  Object.defineProperty(String.prototype, level, {
    get: colors[level],
  });
});
