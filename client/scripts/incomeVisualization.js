'use strict';
// var states = require('../data/state-codes.js');

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');
var ReactVis = require('react-vis');

var XYPlot = ReactVis.XYPlot;
var XAxis = ReactVis.XAxis;
var YAxis = ReactVis.YAxis;
var HorizontalGridLines = ReactVis.HorizontalGridLines;
var VerticalGridLines = ReactVis.VerticalGridLines;
var VerticalBarSeries = ReactVis.VerticalBarSeries;

var IncomeVisualization = function (_React$Component) {
  _inherits(IncomeVisualization, _React$Component);

  function IncomeVisualization(props) {
    _classCallCheck(this, IncomeVisualization);

    var _this = _possibleConstructorReturn(this, (IncomeVisualization.__proto__ || Object.getPrototypeOf(IncomeVisualization)).call(this, props));

    _this.state = {
      chartWidth: 300,
      chartHeight: 300
    };
    return _this;
  }

  _createClass(IncomeVisualization, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          XYPlot,
          {
            xType: 'ordinal',
            xDistance: 100,
            width: 300,
            height: 300 },
          React.createElement(VerticalGridLines, null),
          React.createElement(HorizontalGridLines, null),
          React.createElement(XAxis, { title: 'X' }),
          React.createElement(YAxis, null),
          React.createElement(VerticalBarSeries, {
            color: 'red',
            data: [{ x: 1, y: 10 }, { x: 2, y: 5 }, { x: 3, y: 15 }] })
        )
      );
    }
  }]);

  return IncomeVisualization;
}(React.Component);

module.exports = IncomeVisualization;