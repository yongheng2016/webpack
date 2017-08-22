(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Mylibrary"] = factory();
	else
		root["Mylibrary"] = factory();
})(this, function() {
return webpackJsonpMylibrary([1],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3)
__webpack_require__.e/* require */(0).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(4),__webpack_require__(5),__webpack_require__(6),__webpack_require__(0)]; (function (caroucel, gotop,loadimgs,$){
  caroucel.init(document.querySelectorAll('.container'))
  gotop.init(document.body)
  loadimgs()
}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(__webpack_require__.oe)

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[2]);
});