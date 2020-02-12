(function() {
  // A technique for loading polyfills only when needed. Details here:
  // https://philipwalton.com/articles/loading-polyfills-only-when-needed/
  if (polyfillNeeded()) {
    // Browsers that doesn't support ResizeObserver must load the polyfill first:
    var script = document.createElement('script');
    script.src = 'kirby/polyfills/resize-observer-polyfill.min.js';
    document.head.appendChild(script);
  }

  function polyfillNeeded() {
    return typeof ResizeObserver === 'undefined';
  }
})();
