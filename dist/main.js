/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./style/index.scss":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./style/index.scss ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".hidden {\\n  display: none !important;\\n}\\n\\n.queue_entry > span:first-of-type {\\n  margin-left: 5px;\\n}\\n\\n.removed-msg {\\n  display: none !important;\\n}\\n\\n.media-container {\\n  display: inline-block;\\n  overflow: hidden;\\n}\\n\\n.media-msg {\\n  max-width: 200px;\\n  max-height: 200px;\\n}\\n\\n.image-msg {\\n  transition: 0.2s all;\\n  cursor: zoom-in;\\n}\\n.image-msg:hover {\\n  transform: scale(1.25);\\n}\\n\\n.gif-dialog {\\n  display: flex;\\n  justify-content: center;\\n  flex-direction: column;\\n  width: 200px;\\n  height: 250px;\\n  border: 1px dashed white;\\n}\\n.gif-dialog .gif-container {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  width: 100%;\\n  height: 200px;\\n  overflow: hidden;\\n}\\n.gif-dialog button {\\n  border-style: solid;\\n  border-width: 2px;\\n  border-color: #000000;\\n  background-color: #ffffff;\\n  transition: background-color 0.2s;\\n  color: #000000;\\n}\\n.gif-dialog button:hover {\\n  border: none;\\n}\\n.gif-dialog .next-button {\\n  width: 100%;\\n  height: 25px;\\n  border-bottom: none;\\n}\\n.gif-dialog .next-button:hover {\\n  background-color: #000000;\\n  color: #ffffff;\\n}\\n.gif-dialog .btn-container {\\n  display: flex;\\n  justify-content: space-between;\\n  width: 100%;\\n  height: 25px;\\n}\\n.gif-dialog .btn-container button {\\n  width: 50%;\\n}\\n.gif-dialog .btn-container .confirm-button:hover {\\n  background-color: #02fc00;\\n}\\n.gif-dialog .btn-container .cancel-button {\\n  border-right: none;\\n}\\n.gif-dialog .btn-container .cancel-button:hover {\\n  background-color: #f36666;\\n}\\n\\n.image-preview {\\n  position: fixed;\\n  top: 0;\\n  left: 0;\\n  z-index: 9999;\\n  width: 100vw;\\n  height: 100vh;\\n  background-color: rgba(0, 0, 0, 0.4);\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  cursor: zoom-out;\\n}\\n.image-preview img {\\n  max-width: 80%;\\n  max-height: 80%;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./style/index.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/to-string-loader/src/to-string.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./style/index.scss":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/to-string-loader/src/to-string.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./style/index.scss ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n        var result = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./index.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./style/index.scss\");\n\n        if (typeof result === \"string\") {\n            module.exports = result;\n        } else {\n            module.exports = result.toString();\n        }\n    \n\n//# sourceURL=webpack:///./style/index.scss?./node_modules/to-string-loader/src/to-string.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: userConfig, getCurrentUsername, roomName, getCustomCSSNode, newMessageEventString, msgBuffer, videoBuffer, userList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"userConfig\", function() { return userConfig; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCurrentUsername\", function() { return getCurrentUsername; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"roomName\", function() { return roomName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCustomCSSNode\", function() { return getCustomCSSNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"newMessageEventString\", function() { return newMessageEventString; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"msgBuffer\", function() { return msgBuffer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"videoBuffer\", function() { return videoBuffer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"userList\", function() { return userList; });\nconst userConfig = [\n    {\n        username: \"geoffkeighley\",\n        colour: \"#71b3ff\",\n    },\n    {\n        username: \"sadweeaboo2\",\n        colour: \"#e6b423\",\n    },\n    {\n        username: \"Fitzthistlewits\",\n        colour: \"#a83fff\",\n    },\n    {\n        username: \"Eshnuz\",\n        colour: \"#f7ff00\",\n    },\n];\n\nconst getCurrentUsername = () => {\n    return document\n        .querySelector(\"#welcome\")\n        .innerText.split(\" \")\n        .getLastItem();\n};\n\nconst roomName = \"geoffkeighleysroom\";\n\nconst getCustomCSSNode = () => {\n    return document.head.querySelector(\".custom-css\");\n};\n\nconst newMessageEventString = \"NewMessage\";\n\nconst msgBuffer = document.querySelector(\"#messagebuffer\");\nconst videoBuffer = document.querySelector(\".videolist#queue\");\nconst userList = document.querySelector(\"#userlist\");\n\n\n//# sourceURL=webpack:///./src/constants.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _setup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setup */ \"./src/setup.js\");\n/* harmony import */ var _processors_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./processors/utility */ \"./src/processors/utility.js\");\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utility */ \"./src/utility.js\");\n/* harmony import */ var _processors_messages_processors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./processors/messages/processors */ \"./src/processors/messages/processors.js\");\n/* harmony import */ var _processors_videos_processors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./processors/videos/processors */ \"./src/processors/videos/processors.js\");\n/* harmony import */ var _processors_users_processors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./processors/users/processors */ \"./src/processors/users/processors.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n/**\n * TODO\n * /gif ->\n *      => capture each keydown (verify its a character if possible) in a string\n *      => when ENTER is pressed, check if it has commands\n *      => process commands\n *      => never have to do this from msg buffer this way\n * Integrate webpack for bundling and minifying ONLY (use prettier watch, eslint vscode extension)\n * Break out code into other files (processors, utility, or whatever makes sense)\n * /video -> take lead (if don't already have it), pause video (admin / mod only)\n *        => can I do this with the youtube api directly? or simulate click?\n **/\n\n// gif ideas:\n// -> embed a block that allows you to ask for new gif before committing (ala Slack)\n//    -> use visual notifications of confirmed / not confirmed gifs\n\n// /gif term\n// -> search gif api for term\n// Create way to send \"server\" messages (used for everything)\n// /video\n// -> pauses / play video with lead (admin/mod only)\n// /spin\n// -> spin whatever shows to the right\n// /scroll\n// -> scroll whatever shows to the right\n\n\n\n\n\n\n\n\n\nconst orderedMsgProcessors = [\n    _processors_messages_processors__WEBPACK_IMPORTED_MODULE_3__[\"addUsernameToMsgProcessor\"],\n    _processors_messages_processors__WEBPACK_IMPORTED_MODULE_3__[\"manageInlineEmbedsProcessor\"],\n    _processors_messages_processors__WEBPACK_IMPORTED_MODULE_3__[\"newMsgTabAlertProcessor\"],\n    _processors_messages_processors__WEBPACK_IMPORTED_MODULE_3__[\"addImgOrVideoProcessor\"],\n    _utility__WEBPACK_IMPORTED_MODULE_2__[\"scrollMsgBufferToBottom\"],\n];\n\nconst orderedVideoProcessors = [_processors_videos_processors__WEBPACK_IMPORTED_MODULE_4__[\"addUsernameToVideoProcessor\"]];\n\nconst orderedUserlistProcessors = [\n    _processors_users_processors__WEBPACK_IMPORTED_MODULE_5__[\"addClassToUserlistProcessor\"],\n    _processors_users_processors__WEBPACK_IMPORTED_MODULE_5__[\"addObserverToUserProcessor\"],\n];\n\n// eslint-disable-next-line no-unused-vars\nconst initScript = (() => {\n    Object(_setup__WEBPACK_IMPORTED_MODULE_0__[\"runSetup\"])();\n\n    Object(_processors_utility__WEBPACK_IMPORTED_MODULE_1__[\"runAllProcessors\"])({\n        messages: orderedMsgProcessors,\n        videos: orderedVideoProcessors,\n        users: orderedUserlistProcessors,\n    });\n\n    const msgObserver = new MutationObserver(\n        Object(_processors_utility__WEBPACK_IMPORTED_MODULE_1__[\"createProcessorsFromList\"])(orderedMsgProcessors)\n    );\n    const videoObserver = new MutationObserver(\n        Object(_processors_utility__WEBPACK_IMPORTED_MODULE_1__[\"createProcessorsFromList\"])(orderedVideoProcessors)\n    );\n    const userlistObserver = new MutationObserver(\n        Object(_processors_utility__WEBPACK_IMPORTED_MODULE_1__[\"createProcessorsFromList\"])(orderedUserlistProcessors)\n    );\n\n    msgObserver.observe(_constants__WEBPACK_IMPORTED_MODULE_6__[\"msgBuffer\"], { childList: true });\n    videoObserver.observe(_constants__WEBPACK_IMPORTED_MODULE_6__[\"videoBuffer\"], { childList: true });\n    userlistObserver.observe(_constants__WEBPACK_IMPORTED_MODULE_6__[\"userList\"], { childList: true });\n})();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/processors/messages/constants.js":
/*!**********************************************!*\
  !*** ./src/processors/messages/constants.js ***!
  \**********************************************/
/*! exports provided: whitelistedActions, apiConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"whitelistedActions\", function() { return whitelistedActions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"apiConfig\", function() { return apiConfig; });\nconst whitelistedActions = [\n    \"/gif\",\n    \"/spin\",\n    \"/scroll\",\n    \"/video\",\n    \"/rave\", // maybe? idk\n];\n\nconst apiConfig = {\n    baseURL: \"api.giphy.com/v1/gifs/search\",\n    apiKey: \"fo4xOJtcZuXE1t6JSoof674hHercv45G\",\n    limit: 25,\n};\n\n\n//# sourceURL=webpack:///./src/processors/messages/constants.js?");

/***/ }),

/***/ "./src/processors/messages/processors.js":
/*!***********************************************!*\
  !*** ./src/processors/messages/processors.js ***!
  \***********************************************/
/*! exports provided: addUsernameToMsgProcessor, manageInlineEmbedsProcessor, addImgOrVideoProcessor, newMsgTabAlertProcessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addUsernameToMsgProcessor\", function() { return addUsernameToMsgProcessor; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"manageInlineEmbedsProcessor\", function() { return manageInlineEmbedsProcessor; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addImgOrVideoProcessor\", function() { return addImgOrVideoProcessor; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"newMsgTabAlertProcessor\", function() { return newMsgTabAlertProcessor; });\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utility */ \"./src/utility.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ \"./src/constants.js\");\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utility */ \"./src/processors/messages/utility.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ \"./src/processors/messages/constants.js\");\n\n\n\n\n\nconst addUsernameToMsgProcessor = node => {\n    if (!Object(_utility__WEBPACK_IMPORTED_MODULE_0__[\"isNodeServerMsg\"])(node) && node.querySelector(\".username\") === null) {\n        const username = node.className.split(\"-\").getLastItem();\n        const usernameNode = document.createElement(\"span\");\n        usernameNode.innerHTML = `<strong class=\"username\">${username}: </strong>`;\n        node.insertBefore(usernameNode, node.querySelector(\"span:last-child\"));\n    }\n};\n\nconst manageInlineEmbedsProcessor = node => {\n    const msgNode = node.querySelector(\":scope > span:last-of-type\");\n    const msgUsername = node.className.split(\"-\").getLastItem();\n\n    // NOTE: temporary binder twine to prevent other users from using experimental features\n    if (!Object(_utility__WEBPACK_IMPORTED_MODULE_0__[\"isNodeServerMsg\"])(node) && msgUsername === \"geoffkeighley\") {\n        const message = msgNode.innerText;\n        const action = message.split(\" \")[0];\n\n        if (_constants__WEBPACK_IMPORTED_MODULE_3__[\"whitelistedActions\"].includes(action)) {\n            const startParse = message.lastIndexOf(action);\n            const param = message.slice(startParse + action.length).trim();\n\n            switch (action) {\n                case \"/gif\":\n                    if (msgUsername === Object(_constants__WEBPACK_IMPORTED_MODULE_1__[\"getCurrentUsername\"])()) {\n                        Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"getGifSelectNode\"])(param).then(gifNode => {\n                            Object(_utility__WEBPACK_IMPORTED_MODULE_0__[\"replaceMsgWithNode\"])(msgNode, gifNode);\n                        });\n                    }\n                    break;\n                default:\n                    Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"addFeatureNotImplementedNode\"])(action);\n            }\n        }\n    }\n};\n\nconst addImgOrVideoProcessor = node => {\n    const msgNode = node.querySelector(\":scope > span:last-of-type\");\n    if (msgNode !== null && !Object(_utility__WEBPACK_IMPORTED_MODULE_0__[\"isNodeServerMsg\"])(node)) {\n        const message = msgNode.innerText;\n\n        // Simple Regex Check\n        if (Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"doesMsgContainVideo\"])(message)) {\n            const container = Object(_utility__WEBPACK_IMPORTED_MODULE_0__[\"getMediaNode\"])();\n            container.appendChild(Object(_utility__WEBPACK_IMPORTED_MODULE_0__[\"getVideoNode\"])(message));\n            Object(_utility__WEBPACK_IMPORTED_MODULE_0__[\"replaceMsgWithNode\"])(msgNode, container);\n        } else {\n            // Regex + preload attempt (if needed)\n            // Requires callback\n            Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"doesMsgContainImg\"])(message, () => {\n                const container = Object(_utility__WEBPACK_IMPORTED_MODULE_0__[\"getMediaNode\"])();\n                container.appendChild(Object(_utility__WEBPACK_IMPORTED_MODULE_0__[\"getImgNode\"])(message));\n                Object(_utility__WEBPACK_IMPORTED_MODULE_0__[\"replaceMsgWithNode\"])(msgNode, container);\n            });\n        }\n    }\n};\n\nconst newMsgTabAlertProcessor = () => {\n    window.dispatchEvent(new Event(_constants__WEBPACK_IMPORTED_MODULE_1__[\"newMessageEventString\"]));\n};\n\n\n//# sourceURL=webpack:///./src/processors/messages/processors.js?");

/***/ }),

/***/ "./src/processors/messages/utility.js":
/*!********************************************!*\
  !*** ./src/processors/messages/utility.js ***!
  \********************************************/
/*! exports provided: getGifSelectDialogNode, getGifSelectNode, addFeatureNotImplementedNode, doesMsgContainImg, doesMsgContainVideo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getGifSelectDialogNode\", function() { return getGifSelectDialogNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getGifSelectNode\", function() { return getGifSelectNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addFeatureNotImplementedNode\", function() { return addFeatureNotImplementedNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"doesMsgContainImg\", function() { return doesMsgContainImg; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"doesMsgContainVideo\", function() { return doesMsgContainVideo; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/processors/messages/constants.js\");\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utility */ \"./src/utility.js\");\n\n\n\n// const doesMsgContainWhitelistedAction = msg => {\n//   const msgSplit = msg.split(' ');\n//   for (let i = 0; i < msgSplit.length; i++) {\n//     if (whitelistedActions.includes(msgSplit[i])) {\n//       return true;\n//     }\n//   }\n//\n//   return false;\n// };\n\nconst getGifSelectDialogNode = gifsList => {\n    const wrapper = document.createElement(\"span\");\n\n    let gifsListIndex = 0;\n    const container = document.createElement(\"span\");\n    container.classList.add(\"gif-dialog\");\n\n    const nextButton = document.createElement(\"button\");\n    nextButton.classList.add(\"next-button\");\n    nextButton.innerText = \"Next\";\n    nextButton.addEventListener(\"click\", () => {\n        gifsListIndex =\n            gifsListIndex >= gifsList.length - 1 ? 0 : gifsListIndex + 1;\n        container.querySelector(\"img\").src =\n            gifsList[gifsListIndex].images.original.url;\n    });\n\n    const gifContainer = document.createElement(\"div\");\n    gifContainer.classList.add(\"gif-container\");\n\n    const gifNode = Object(_utility__WEBPACK_IMPORTED_MODULE_1__[\"getImgNode\"])(gifsList[0].images.original.url);\n\n    gifContainer.appendChild(gifNode);\n\n    container.appendChild(gifContainer);\n    container.appendChild(nextButton);\n\n    const cancelButton = document.createElement(\"button\");\n    cancelButton.classList.add(\"cancel-button\");\n    cancelButton.innerText = \"Cancel\";\n    cancelButton.addEventListener(\"click\", () => {\n        container.parentNode.parentNode.remove();\n    });\n\n    const confirmButton = document.createElement(\"button\");\n    confirmButton.classList.add(\"confirm-button\");\n    confirmButton.innerText = \"Confirm\";\n    confirmButton.addEventListener(\"click\", () => {\n        let newNode = Object(_utility__WEBPACK_IMPORTED_MODULE_1__[\"getMediaNode\"])();\n        newNode.appendChild(gifNode);\n        container.parentNode.replaceChild(newNode, container);\n    });\n\n    const btnContainer = document.createElement(\"div\");\n    btnContainer.classList.add(\"btn-container\");\n    btnContainer.appendChild(cancelButton);\n    btnContainer.appendChild(confirmButton);\n\n    container.appendChild(btnContainer);\n    wrapper.appendChild(container);\n    wrapper.style.display = \"inline-block\";\n\n    return wrapper;\n};\n\nconst getGifSelectNode = term => {\n    return new Promise((resolve, reject) => {\n        if (term.length > 0) {\n            fetch(\n                `https://${_constants__WEBPACK_IMPORTED_MODULE_0__[\"apiConfig\"].baseURL}?api_key=${\n                    _constants__WEBPACK_IMPORTED_MODULE_0__[\"apiConfig\"].apiKey\n                }&q=${encodeURIComponent(term)}`\n            )\n                .then(res => {\n                    if (res.status !== 200) {\n                        reject({\n                            err: \"Server error: \" + res.status,\n                        });\n                    } else {\n                        res.json()\n                            .then(({ data }) => {\n                                console.log(data);\n                                if (data.length > 0) {\n                                    resolve(getGifSelectDialogNode(data));\n                                }\n                            })\n                            .catch(err => {\n                                reject({ err });\n                            });\n                    }\n                })\n                .catch(err => {\n                    reject({\n                        err: \"API call was not sent correctly: \" + err,\n                    });\n                });\n            // if has results ->\n            // create node with gif inside and 3 buttons ()\n            // if has no results ->\n            // return server error message to only initiating user\n            // everyone else just sees the failed gif search\n            // ->> how do we prevent this causing issues on refresh?\n        } else {\n            reject({\n                err: \"Param length is 0\",\n            });\n        }\n    });\n};\n\nconst addFeatureNotImplementedNode = action => {\n    const testNode = document.createElement(\"div\");\n    testNode.classList.add(\"gif\");\n    testNode.innerText = \"HELLO \" + action;\n    return testNode;\n};\n\nconst isImagePreloadTest = (url, onSuccess) => {\n    const image = new Image();\n    image.onload = onSuccess;\n    image.src = url;\n};\n\nconst doesMsgContainImg = (msg, onSuccess) => {\n    const fileExtMatch = msg.match(/.*\\.(?:jpg|gif|png|bmp|jpeg|webp)/i);\n    const protocolMatch = msg.match(/^https:\\/\\/\\S*/i);\n    if (\n        fileExtMatch !== null &&\n        fileExtMatch.length === 1 &&\n        fileExtMatch[0] === msg\n    ) {\n        onSuccess();\n    } else if (\n        protocolMatch !== null &&\n        protocolMatch.length === 1 &&\n        protocolMatch[0] === msg\n    ) {\n        isImagePreloadTest(msg, onSuccess);\n    }\n};\n\nconst doesMsgContainVideo = msg => {\n    const urls = msg.match(/.*\\.(?:webm|mp4)/i);\n    return urls !== null && urls.length === 1 && urls[0] === msg;\n};\n\n\n//# sourceURL=webpack:///./src/processors/messages/utility.js?");

/***/ }),

/***/ "./src/processors/users/processors.js":
/*!********************************************!*\
  !*** ./src/processors/users/processors.js ***!
  \********************************************/
/*! exports provided: addClassToUserlistProcessor, addObserverToUserProcessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addClassToUserlistProcessor\", function() { return addClassToUserlistProcessor; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addObserverToUserProcessor\", function() { return addObserverToUserProcessor; });\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility */ \"./src/processors/utility.js\");\n\n\nconst addClassToUserlistProcessor = node => {\n    if (node.querySelector('[class*=\"username-\"]') === null) {\n        const userNode = node.querySelector(\":scope > span:last-of-type\");\n        userNode.className = `username-${userNode.innerText}`;\n    }\n};\n\nconst addObserverToUserProcessor = outerNode => {\n    const userChangeProcessor = innerNode => {\n        const parent = innerNode.parentNode.parentNode;\n        const userNode = parent.querySelector(\":scope > span:last-of-type\");\n        if (parent.querySelector('[class*=\"username-\"]') === null) {\n            userNode.className = `username-${userNode.innerText}`;\n        }\n    };\n\n    const userObserver = new MutationObserver(\n        Object(_utility__WEBPACK_IMPORTED_MODULE_0__[\"createProcessorsFromList\"])([userChangeProcessor])\n    );\n\n    outerNode = outerNode.querySelector(\"span\");\n    userObserver.observe(outerNode, { childList: true });\n};\n\n\n//# sourceURL=webpack:///./src/processors/users/processors.js?");

/***/ }),

/***/ "./src/processors/utility.js":
/*!***********************************!*\
  !*** ./src/processors/utility.js ***!
  \***********************************/
/*! exports provided: createProcessorsFromList, runAllProcessors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createProcessorsFromList\", function() { return createProcessorsFromList; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"runAllProcessors\", function() { return runAllProcessors; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n\n\nconst createProcessorsFromList = listOfProcessors => {\n    return mutationsList => {\n        for (let mutation of mutationsList) {\n            mutation.addedNodes.forEach(n => {\n                for (let i = 0; i < listOfProcessors.length; i++) {\n                    listOfProcessors[i](n);\n                }\n            });\n        }\n    };\n};\n\n/**\n *\n * @param {Object} processors A config of processors\n *** @key {messages[]} Required. Ordered list of \"new message\" processors.\n *** @key {videos[]} Required. Ordered list of \"new video\" processors.\n *** @key {users[]} Required. Ordered list of \"new user in userlist\" processors.\n */\nconst runAllProcessors = processors => {\n    _constants__WEBPACK_IMPORTED_MODULE_0__[\"msgBuffer\"].childNodes.forEach(n => {\n        for (let i = 0; i < processors.messages.length; i++) {\n            processors.messages[i](n);\n        }\n    });\n\n    _constants__WEBPACK_IMPORTED_MODULE_0__[\"videoBuffer\"].childNodes.forEach(n => {\n        for (let i = 0; i < processors.videos.length; i++) {\n            processors.videos[i](n);\n        }\n    });\n\n    _constants__WEBPACK_IMPORTED_MODULE_0__[\"userList\"].childNodes.forEach(n => {\n        for (let i = 0; i < processors.users.length; i++) {\n            processors.users[i](n);\n        }\n    });\n};\n\n\n//# sourceURL=webpack:///./src/processors/utility.js?");

/***/ }),

/***/ "./src/processors/videos/processors.js":
/*!*********************************************!*\
  !*** ./src/processors/videos/processors.js ***!
  \*********************************************/
/*! exports provided: addUsernameToVideoProcessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addUsernameToVideoProcessor\", function() { return addUsernameToVideoProcessor; });\nconst addUsernameToVideoProcessor = node => {\n    if (node.querySelector('span[class*=\"video-added-by\"]') === null) {\n        const username = node.title.split(\" \").getLastItem();\n        const nameSpan = document.createElement(\"span\");\n        nameSpan.className = `video-added-by-${username}`;\n        nameSpan.innerHTML = `Added by <strong>${username}</strong>`;\n        node.insertBefore(nameSpan, node.querySelector(\"span\"));\n    }\n};\n\n\n//# sourceURL=webpack:///./src/processors/videos/processors.js?");

/***/ }),

/***/ "./src/setup.js":
/*!**********************!*\
  !*** ./src/setup.js ***!
  \**********************/
/*! exports provided: runSetup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"runSetup\", function() { return runSetup; });\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility */ \"./src/utility.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n/* harmony import */ var to_string_loader_css_loader_sass_loader_style_index_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! to-string-loader!css-loader!sass-loader!../style/index.scss */ \"./node_modules/to-string-loader/src/to-string.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./style/index.scss\");\n/* harmony import */ var to_string_loader_css_loader_sass_loader_style_index_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(to_string_loader_css_loader_sass_loader_style_index_scss__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst initLargeImageArea = () => {\n    const imgPreviewClass = \"image-preview\";\n    if (document.querySelector(`.${imgPreviewClass}`) === null) {\n        const imgPreviewContainer = document.createElement(\"div\");\n        imgPreviewContainer.classList.add(imgPreviewClass);\n        imgPreviewContainer.classList.add(\"hidden\");\n        imgPreviewContainer.onclick = () => {\n            imgPreviewContainer.classList.add(\"hidden\");\n        };\n\n        const previewImage = document.createElement(\"img\");\n        imgPreviewContainer.appendChild(previewImage);\n\n        document.addEventListener(\"keydown\", e => {\n            if (\n                e.key === \"Escape\" &&\n                !imgPreviewContainer.classList.contains(\"hidden\")\n            ) {\n                imgPreviewContainer.classList.add(\"hidden\");\n            }\n        });\n\n        document.body.appendChild(imgPreviewContainer);\n    }\n};\n\nconst initCustomCSS = () => {\n    const customCssInHead = Object(_constants__WEBPACK_IMPORTED_MODULE_1__[\"getCustomCSSNode\"])();\n    if (customCssInHead === null) {\n        const customStyleTag = document.createElement(\"style\");\n        customStyleTag.classList.add(\"custom-css\");\n        document.head.appendChild(customStyleTag);\n    } else {\n        customCssInHead.innerText = \"\";\n    }\n};\n\nconst initCustomUserSettings = () => {\n    const getCustomUserCss = userConfig => {\n        return `\n    .chat-msg-${userConfig.username} .username {\n      color: ${userConfig.colour};\n    }\n    .video-added-by-${userConfig.username} strong {\n      color: ${userConfig.colour};\n    }\n    .username-${userConfig.username} {\n      color: ${userConfig.colour};\n    }\n    `;\n    };\n\n    for (let i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_1__[\"userConfig\"].length; i++) {\n        Object(_utility__WEBPACK_IMPORTED_MODULE_0__[\"addCSS\"])(getCustomUserCss(_constants__WEBPACK_IMPORTED_MODULE_1__[\"userConfig\"][i]));\n    }\n\n    Object(_utility__WEBPACK_IMPORTED_MODULE_0__[\"addCSS\"])(to_string_loader_css_loader_sass_loader_style_index_scss__WEBPACK_IMPORTED_MODULE_2___default.a);\n};\n\nconst initVisibilityListener = () => {\n    let newMsgInterval = undefined;\n    const visiblityData = Object(_utility__WEBPACK_IMPORTED_MODULE_0__[\"getVisibilityData\"])();\n    if (visiblityData !== undefined) {\n        window.addEventListener(_constants__WEBPACK_IMPORTED_MODULE_1__[\"newMessageEventString\"], () => {\n            if (\n                document[visiblityData.hidden] &&\n                newMsgInterval === undefined\n            ) {\n                newMsgInterval = setInterval(() => {\n                    if (document.title === _constants__WEBPACK_IMPORTED_MODULE_1__[\"roomName\"]) {\n                        document.title = \"New Message!\";\n                    } else {\n                        document.title = _constants__WEBPACK_IMPORTED_MODULE_1__[\"roomName\"];\n                    }\n                }, 500);\n            }\n        });\n\n        window.addEventListener(visiblityData.visibilityEvent, () => {\n            if (!document[visiblityData.hidden]) {\n                clearInterval(newMsgInterval);\n                newMsgInterval = undefined;\n                document.title = _constants__WEBPACK_IMPORTED_MODULE_1__[\"roomName\"];\n            }\n        });\n    }\n};\n\nconst initMisc = () => {\n    Array.prototype.getLastItem = function () {\n        return this[this.length - 1];\n    };\n};\n\nconst runSetup = () => {\n    initMisc();\n    initLargeImageArea();\n    initCustomCSS();\n    initCustomUserSettings();\n    initVisibilityListener();\n};\n\n\n//# sourceURL=webpack:///./src/setup.js?");

/***/ }),

/***/ "./src/utility.js":
/*!************************!*\
  !*** ./src/utility.js ***!
  \************************/
/*! exports provided: addCSS, isNodeServerMsg, scrollMsgBufferToBottom, getServerMsgNode, getMediaNode, getImgNode, getVideoNode, appendMsgNodeToBuffer, getVisibilityData, replaceMsgWithNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addCSS\", function() { return addCSS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isNodeServerMsg\", function() { return isNodeServerMsg; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"scrollMsgBufferToBottom\", function() { return scrollMsgBufferToBottom; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getServerMsgNode\", function() { return getServerMsgNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getMediaNode\", function() { return getMediaNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getImgNode\", function() { return getImgNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getVideoNode\", function() { return getVideoNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"appendMsgNodeToBuffer\", function() { return appendMsgNodeToBuffer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getVisibilityData\", function() { return getVisibilityData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"replaceMsgWithNode\", function() { return replaceMsgWithNode; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\n\nconst addCSS = cssString => {\n    Object(_constants__WEBPACK_IMPORTED_MODULE_0__[\"getCustomCSSNode\"])().innerText =\n        Object(_constants__WEBPACK_IMPORTED_MODULE_0__[\"getCustomCSSNode\"])().innerText + \" \" + cssString;\n};\n\nconst isNodeServerMsg = node => {\n    return node.className.includes(\"server-msg\");\n};\n\nconst scrollMsgBufferToBottom = () => {\n    _constants__WEBPACK_IMPORTED_MODULE_0__[\"msgBuffer\"].scrollTop = _constants__WEBPACK_IMPORTED_MODULE_0__[\"msgBuffer\"].scrollHeight;\n};\n\nconst getServerMsgNode = (msgText, colour) => {\n    const container = document.createElement(\"div\");\n    container.classList.add(\"server-msg-reconnect\");\n    container.innerText = msgText;\n    container.style.color = colour;\n\n    return container;\n};\n\nconst getMediaNode = () => {\n    const container = document.createElement(\"div\");\n    container.classList.add(\"media-container\");\n\n    return container;\n};\n\nconst getImgNode = imgSrc => {\n    const newNode = document.createElement(\"img\");\n    newNode.src = imgSrc;\n    newNode.classList.add(\"image-msg\");\n    newNode.classList.add(\"media-msg\");\n\n    newNode.onclick = () => {\n        document.querySelector(\".image-preview img\").src = newNode.src;\n        document.querySelector(\".image-preview\").classList.remove(\"hidden\");\n    };\n    newNode.onload = scrollMsgBufferToBottom;\n\n    return newNode;\n};\n\nconst getVideoNode = videoSrc => {\n    const newNode = document.createElement(\"video\");\n    newNode.autoplay = true;\n    newNode.controls = true;\n    newNode.poster = true;\n    newNode.loop = true;\n    newNode.muted = true;\n\n    newNode.onloadedmetadata = scrollMsgBufferToBottom;\n    newNode.addEventListener(\"error\", scrollMsgBufferToBottom);\n\n    const srcElement = document.createElement(\"source\");\n    srcElement.src = videoSrc;\n    const fileExt = videoSrc.match(/(?=.)\\w*$/i);\n    srcElement.type = \"video/\" + fileExt;\n\n    newNode.appendChild(srcElement);\n    newNode.classList.add(\"video-msg\");\n    newNode.classList.add(\"media-msg\");\n\n    return newNode;\n};\n\n/**\n * @param {object | string} msg Can be a DOM element or text string. Will be appended to message buffer.\n * @returns {null} returns null if msg isn't a node or text string, otherwise does not explicitly return\n **/\nconst appendMsgNodeToBuffer = msg => {\n    const msgSpan = document.createElement(\"span\");\n    msgSpan.style.display = \"inline-block\";\n    if (typeof msg === \"object\" && msg.innerHTML !== undefined) {\n        msgSpan.appendChild(msg);\n    } else if (typeof msg === \"string\") {\n        msgSpan.innerText = msg;\n    } else {\n        return null;\n    }\n\n    const container = document.createElement(\"div\");\n    container.classList.add(`chat-msg-${Object(_constants__WEBPACK_IMPORTED_MODULE_0__[\"getCurrentUsername\"])()}`);\n\n    const timestamp = document.createElement(\"span\");\n    timestamp.classList.add(\"timestamp\");\n    const dateTime = new Date();\n    // Whitespace on end is expected\n    timestamp.innerText = `[${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}] `;\n\n    const usernameSpan = document.createElement(\"span\");\n    const usernameStrong = document.createElement(\"strong\");\n    // Whitespace on end is expected\n    usernameStrong.innerText = `${Object(_constants__WEBPACK_IMPORTED_MODULE_0__[\"getCurrentUsername\"])()}: `;\n    usernameStrong.classList.add(\"username\");\n\n    usernameSpan.appendChild(usernameStrong);\n\n    container.appendChild(timestamp);\n    container.appendChild(usernameSpan);\n    container.appendChild(msgSpan);\n\n    _constants__WEBPACK_IMPORTED_MODULE_0__[\"msgBuffer\"].appendChild(container);\n};\n\nconst getVisibilityData = () => {\n    if (typeof document.hidden !== \"undefined\") {\n        return {\n            hidden: \"hidden\",\n            visibilityEvent: \"visibilitychange\",\n        };\n    } else if (typeof document.msHidden !== \"undefined\") {\n        return {\n            hidden: \"msHidden\",\n            visibilityEvent: \"msvisibilitychange\",\n        };\n    } else if (typeof document.webkitHidden !== \"undefined\") {\n        return {\n            hidden: \"webkitHidden\",\n            visibilityEvent: \"webkitvisibilitychange\",\n        };\n    }\n\n    return undefined;\n};\n\nconst replaceMsgWithNode = (msgNode, newNode) => {\n    msgNode.parentNode.replaceChild(newNode, msgNode);\n};\n\n\n//# sourceURL=webpack:///./src/utility.js?");

/***/ })

/******/ });