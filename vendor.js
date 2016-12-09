require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"associated":[function(require,module,exports){
!function(root, name, make) {
  if (typeof module != 'undefined' && module.exports) module.exports = make()
  else if (typeof define == 'function' && define.amd) define(make)
  else root[name] = make()
}(this, 'associated', function() {

  function control($label) {
    var id = $label.attr('for')
    return id ? new $label.constructor('#' + id) : $label.find('input,textarea,select,button')
  }

  function label($control) {
    var $parent = $control.closest('label')
    return $parent.length ? $parent : forId($control).first()
  }

  function forId($control) {
    var id = $control.attr('id')
    return new $control.constructor(id ? 'label[for="' +  id + '"]' : id)
  }

  function labels($control) {
    return $control.closest('label').add(forId($control))
  }

  return {
    control: control,
    label: label,
    labels: labels
  }
});

},{}],"ssv":[function(require,module,exports){
!function(root, name, make) {
  typeof module != 'undefined' && module.exports ? module.exports = make() : root[name] = make()
}(this, 'ssv', function() {

  var api = {}
  var word = /\S+/g
  var space = ' '

  function parse(string) {
    return string.match(word) || []
  }

  function compact(ssv) {
    return parse(ssv).join(space)
  }

  function pad(string) {
    return space + string + space
  }

  function has(ssv, value) {
    if (!ssv.match(word)) return false
    return -1 < pad(compact(ssv)).indexOf(pad(value))
  }

  function push(ssv, value) {
    return ssv.length ? compact(ssv + space + value) : String(value)
  }

  function add(ssv, value) {
    return has(ssv, value) ? compact(ssv) : push(ssv, value)
  }

  function remove(ssv, value) {
    ssv = pad(compact(ssv)).replace(pad(value), space)
    return has(ssv, value) ? remove(ssv, value) : compact(ssv)
  }

  api['parse'] = parse
  api['compact'] = compact
  api['has'] = has
  api['push'] = push
  api['add'] = add
  api['remove'] = remove
  return api
});

},{}]},{},[]);
