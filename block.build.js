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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var _extends2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var __ = wp.i18n.__;
var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    RichText = _wp$blocks.RichText,
    AlignmentToolbar = _wp$blocks.AlignmentToolbar,
    BlockControls = _wp$blocks.BlockControls;
var addFilter = wp.hooks.addFilter;
var _wp$editor = wp.editor,
    MediaUpload = _wp$editor.MediaUpload,
    InnerBlocks = _wp$editor.InnerBlocks,
    InspectorControls = _wp$editor.InspectorControls,
    ColorPalette = _wp$editor.ColorPalette,
    PanelColorSettings = _wp$editor.PanelColorSettings;
var _wp$components = wp.components,
    Button = _wp$components.Button,
    Panel = _wp$components.Panel,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    PanelColor = _wp$components.PanelColor,
    RangeControl = _wp$components.RangeControl,
    SelectControl = _wp$components.SelectControl,
    TextControl = _wp$components.TextControl,
    BaseControl = _wp$components.BaseControl,
    Dashicon = _wp$components.Dashicon;
var _wp$element = wp.element,
    Component = _wp$element.Component,
    Fragment = _wp$element.Fragment;
var _lodash = lodash,
    assign = _lodash.assign;
var createHigherOrderComponent = wp.compose.createHigherOrderComponent;


addFilter('blocks.registerBlockType', 'gutenberg-blocks/registerExtraListAttrs', function (settings) {
    if (settings.name === 'core/heading') {
        settings.attributes = Object.assign(settings.attributes, {
            id: {
                type: 'string'
            },
            blockID: {
                type: 'string'
            },
            textColor: {
                type: 'string',
                default: '#000'
            }
        });
    }
    return settings;
});

// Add text color option to select for all blocks
addFilter('editor.BlockEdit', 'gutenberg-blocks/customListStyles', function (BlockEdit) {
    return function (props) {
        if (props.name === 'core/heading') {
            var isSelected = props.isSelected,
                attributes = props.attributes,
                setAttributes = props.setAttributes,
                clientId = props.clientId;
            var textColor = attributes.textColor;

            setAttributes({ blockID: 'block-' + clientId });
            return [wp.element.createElement(BlockEdit, _extends2({ key: 'block-edit-custom-separator' }, props)), isSelected && wp.element.createElement(
                InspectorControls,
                null,
                wp.element.createElement(
                    Fragment,
                    null,
                    wp.element.createElement(PanelColorSettings, {
                        title: __('Text Color'),
                        initialOpen: false,
                        colorSettings: [{
                            label: __('Text Color'),
                            value: textColor,
                            onChange: function onChange(value) {
                                return setAttributes({ textColor: value });
                            }
                        }]
                    })
                )
            ), wp.element.createElement(
                'div',
                null,
                wp.element.createElement(
                    'style',
                    null,
                    '#block-' + clientId + ' h2, #block-' + clientId + ' h3, #block-' + clientId + ' h4, #block-' + clientId + ' h5, #block-' + clientId + ' h6, #block-' + clientId + ' {\n                                color: ' + textColor + ';\n                            }'
                )
            )];
        }
        return wp.element.createElement(BlockEdit, props);
    };
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};

// Apply text color on front-end
addFilter('blocks.getSaveContent.extraProps', 'gutenberg-blocks/saveListStyles', function (extraProps, blockType, attributes) {
    if (blockType.name === 'core/heading') {
        var blockID = attributes.blockID;

        extraProps = _extends(extraProps, {
            id: blockID
        });
        return extraProps;
    }
});

// Save option to show in frontend
addFilter('blocks.getSaveElement', 'gutenberg-blocks/saveTextColumnsElm', function (SaveElm, blockType, attributes) {
    var blockID = attributes.blockID,
        textColor = attributes.textColor;

    if (blockType.name === 'core/heading' && blockID) {
        return React.createElement(Fragment, null, SaveElm, React.createElement('style', null, '#' + blockID + ' h2, #' + blockID + ' h3, #' + blockID + ' h4, #' + blockID + ' h5 , #' + blockID + ' { color: ' + textColor + '; }'));
    }
    return SaveElm;
});

/***/ })
/******/ ]);