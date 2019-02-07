(function () {
    // A technique for loading polyfills only when needed. Details here:
    // https://philipwalton.com/articles/loading-polyfills-only-when-needed/
    if (polyfillNeeded()) {
      // Browsers at larger breakpoints that don't support all
      // required features must load the polyfills first:
      var script = document.createElement('script');
      script.src = 'kirby/polyfills/resize-observer-polyfill.min.js';
      document.head.appendChild(script);
    }

    function polyfillNeeded() {
        return (typeof ResizeObserver === 'undefined') &&
               (window.screen && window.screen.width >= 576);
    }
  })();