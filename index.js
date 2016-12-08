!function(name, make) {
  make = make()
  var angular = require('angular')
  var app = angular.module(name, []).directive(name, make)
  if (typeof module != 'undefined') module.exports = make
  else this[name] = make
}('labelClass', function() {

  function associatedInput(label) {
    var id = label.attr('for');
    return id ? new label.constructor('#' + id) : label.find('input');
  }

  return function() {
    var angular = require('angular')

    return {
      restrict: 'A',
      link: function (scope, label, atts) {
        var input = associatedInput(label)
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
