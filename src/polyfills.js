// forEach polyfill for NodeList
if (window.NodeList && !window.NodeList.prototype.forEach) {
  window.NodeList.prototype.forEach = Array.prototype.forEach
}
