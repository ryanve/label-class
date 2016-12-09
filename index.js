!function(root, name, make) {
  make = make()
  var angular = root.angular || require('angular')
  var app = angular.module(name, []).directive(name, make)
  if (typeof module != 'undefined') module.exports = make
  else root[name] = make
  if (typeof define == 'function') define(function() { return make })
}(this, 'labelClass', function() {
  return function() {
    var angular = window.angular || require('angular')
    var control = require('associated').control

    return {
      restrict: 'A',
      link: function (scope, label, atts) {
        var input = control(label)
        var map = scope.$eval(atts.labelClass)

        angular.forEach(map, function(state, classes) {
          function getter() {
            return input.is(state)
          }

          function setter(bool) {
            label.toggleClass(classes, bool)
          }

          setter(getter())
          scope.$watch(getter, setter)
        })
      }
    }
  }
});
