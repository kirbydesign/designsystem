(function () {
    // A technique for loading polyfills only when needed. Details here:
    // https://philipwalton.com/articles/loading-polyfills-only-when-needed/
    if (polyfillNeeded()) {
      // Browsers at larger breakpoints that don't support all
      // required features must load the polyfills first:
      var script = document.createElement('script');
      script.src = 'kirby/polyfills/resize-observer-polyfill.min.js';
      script.onload = init;
      document.head.appendChild(script);
    }

    function polyfillNeeded() {
        return (typeof ResizeObserver === 'undefined') &&
               (window.screen && window.screen.width >= 576);
               //matchMedia('(min-width: 576px)').matches
    }

    // Taken from: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
    function isTouchDevice() {
        var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
        var mq = function(query) {
          return window.matchMedia(query).matches;
        }
      
        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          return true;
        }
      
        // include the 'heartz' as a way to have a non matching MQ to help terminate the join
        // https://github.com/Modernizr/Modernizr/issues/1814
        var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
        return mq(query);
      }

    function init() {
      console.log('Polyfill loaded.');
    }
  })();