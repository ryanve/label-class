!function(name, make) {
  make = make()
  var angular = require('angular')
  var app = angular.module(name, []).directive(name, make)
  if (typeof module != 'undefined') module.exports = make
  else this[name] = make
}('labelClass', function() {
  return function() {
    var angular = require('angular')
    var associated = require('associated')

    return {
      restrict: 'A',
      link: function (scope, label, atts) {
        var input = associated.input(label)
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
