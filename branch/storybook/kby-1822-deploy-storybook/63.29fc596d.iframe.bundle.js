(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{1194:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"kirby_badge",(function(){return Badge}));var _index_9c03db42_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(532);function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}var createClassMap=function(classes){var map={};return function(classes){return void 0!==classes?(Array.isArray(classes)?classes:classes.split(" ")).filter((function(c){return null!=c})).map((function(c){return c.trim()})).filter((function(c){return""!==c})):[]}(classes).forEach((function(c){return map[c]=!0})),map},Badge=function(){function Badge(hostRef){!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,Badge),Object(_index_9c03db42_js__WEBPACK_IMPORTED_MODULE_0__.e)(this,hostRef),this.size="md"}return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}(Badge,[{key:"cssClass",get:function(){return createClassMap([this.size,this.themeColor])}},{key:"badgeContent",get:function(){return"sm"===this.size?Object(_index_9c03db42_js__WEBPACK_IMPORTED_MODULE_0__.c)("span",null):this.text?Object(_index_9c03db42_js__WEBPACK_IMPORTED_MODULE_0__.c)("span",null,this.text):Object(_index_9c03db42_js__WEBPACK_IMPORTED_MODULE_0__.c)("slot",null)}},{key:"render",value:function render(){return Object(_index_9c03db42_js__WEBPACK_IMPORTED_MODULE_0__.c)(_index_9c03db42_js__WEBPACK_IMPORTED_MODULE_0__.a,{class:this.cssClass},Object(_index_9c03db42_js__WEBPACK_IMPORTED_MODULE_0__.c)("ion-badge",null,this.badgeContent))}}]),Badge}();Badge.style=":host{position:var(--kirby-badge-position, relative);left:var(--kirby-badge-left, auto);right:var(--kirby-badge-right, auto);top:var(--kirby-badge-top, auto);z-index:var(--kirby-badge-z-index, none);font-size:10px;line-height:1}:host ion-badge{--background:var(--kirby-white);--color:var(--kirby-white-contrast);--ion-color-base:var(--kirby-badge-background-color);--ion-color-contrast:var(--kirby-badge-color);box-sizing:border-box;border-radius:8px;font-size:inherit;position:relative;box-shadow:var(--kirby-badge-elevation, none)}:host ::slotted(kirby-icon){--kirby-icon-font-size:16px;position:absolute;top:0;left:0}:host(.sm) ion-badge{padding:initial;min-height:initial;min-width:initial;height:8px;width:8px}:host(.md) ion-badge{--padding-top:3px;--padding-end:5px;--padding-bottom:3px;--padding-start:5px;min-width:16px;min-height:16px}:host(.success) ion-badge{--background:var(--kirby-success);--color:var(--kirby-badge-color, var(--kirby-success-contrast))}:host(.warning) ion-badge{--background:var(--kirby-warning);--color:var(--kirby-badge-color, var(--kirby-warning-contrast))}:host(.danger) ion-badge{--background:var(--kirby-danger);--color:var(--kirby-badge-color, var(--kirby-text-color-white))}"}}]);