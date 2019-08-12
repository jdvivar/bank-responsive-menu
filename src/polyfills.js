// forEach polyfill for NodeList
// https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
if (window.NodeList && !window.NodeList.prototype.forEach) {
  window.NodeList.prototype.forEach = Array.prototype.forEach
}

// matches & closest polyfill for IE9+ from
// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (!window.Element.prototype.matches) {
  window.Element.prototype.matches = window.Element.prototype.msMatchesSelector ||
                              window.Element.prototype.webkitMatchesSelector
}

if (!window.Element.prototype.closest) {
  window.Element.prototype.closest = function (s) {
    var el = this

    do {
      if (el.matches(s)) return el
      el = el.parentElement || el.parentNode
    } while (el !== null && el.nodeType === 1)
    return null
  }
}

// is IE?
window.isIE = 'ActiveXObject' in window
