typeof document == 'undefined' ?
  require('open')('test.html') :
angular.module('test', []).controller('test', ['$timeout', '$scope', function($timeout, $scope) {
  var ssv = require('ssv')
  var forEach = [].forEach
  var control = require('associated').control

  function pseudo(name) {
    return ':' + name
  }

  function ok(actual, correct, message) {
    if (actual !== correct) throw new Error(message)
  }

  function toggle(object, property) {
    return object[property] = !object[property]
  }

  function property(name, label) {
    var input = control(label)
    ok(
      label.hasClass(name),
      input.is(pseudo(name)),
      name + ' class should match state'
    )
    toggle(input, name)
  }

  var tests = {
    disabled: property.bind(null, 'disabled'),
    checked: property.bind(null, 'checked')
  }

  $('[data-test]').each(function() {
    var label = angular.element(this)

    ssv.parse(this.dataset.test).forEach(function(name) {
      function test() {
        tests[name](label)
      }

      function apply() {
        $scope.$apply(test)
      }

      $timeout(apply)
      $timeout(apply)
    })
  })
}]).directive('labelClass', labelClass);
