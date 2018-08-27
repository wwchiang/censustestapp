'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
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
      chartHeight: 300,
      selectedTab: null,
      dataSets: [],
      currentDataSet: [],
      tickTotal: 10,
      tickValues: []
    };
    return _this;
  }

  _createClass(IncomeVisualization, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      if (this.props.countyIncomeData !== prevProps.countyIncomeData || this.props.income !== prevProps.income) {
        this.setState(function (prevState, props) {
          return {
            dataSets: _this2.formatDataSets(_this2.props.countyIncomeData, _this2.props.income)
          };
        }, function () {
          _this2.switchDataSet(0);
        });
      }
    }
  }, {
    key: 'formatDataSets',
    value: function formatDataSets(countyIncomeData, userIncome) {
      var dataSets = [];
      dataSets.push(this.formatIncomeSet(countyIncomeData['incomeDataAll'], userIncome));
      dataSets.push(this.formatIncomeSet(countyIncomeData['incomeDataFamilies'], userIncome));
      dataSets.push(this.formatIncomeSet(countyIncomeData['incomeDataNonFamilies'], userIncome));

      return dataSets;
    }
  }, {
    key: 'formatToThousands',
    value: function formatToThousands(amount) {
      if (amount < 1000) return 0;

      return Math.floor(amount / 1000);
    }
  }, {
    key: 'formatIncomeSet',
    value: function formatIncomeSet(incomeSet, userIncome) {
      var _this3 = this;

      var formattedIncome = incomeSet.reduce(function (data, currentBracket) {
        var barValue = _this3.formatToThousands(currentBracket.min) + "K";;
        if (currentBracket.max !== undefined) {
          barValue += " - " + _this3.formatToThousands(currentBracket.max + 1) + "K";;
        } else {
          barValue += "+";
        }

        var column = {
          x: barValue,
          y: _this3.formatToThousands(currentBracket.households)

          //If the income is either between brackets or greater than the greatest bracket, give it a unique color.
        };if (userIncome >= currentBracket.min && (currentBracket.max !== undefined && userIncome <= currentBracket.max || currentBracket.max === undefined)) {
          column.color = '#3d3dfd';
        } else {
          column.color = '#a2a2fb';
        }

        data.push(column);
        return data;
      }, []);
      return formattedIncome;
    }
  }, {
    key: 'switchDataSet',
    value: function switchDataSet(index) {
      var _this4 = this;

      this.setState(function (prevState, props) {
        return {
          currentDataSet: _this4.state.dataSets[index],
          selectedTab: index
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var titleStyle = { fontFamily: 'Arial', fontSize: '1.2rem', fontWeight: '20' };
      var tickStyle = { fontFamily: 'Arial', fontSize: '.9rem', fontWeight: '10' };
      return React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { onClick: function onClick() {
              return _this5.switchDataSet(0);
            } },
          'Income Data(All)'
        ),
        React.createElement(
          'button',
          { onClick: function onClick() {
              return _this5.switchDataSet(1);
            } },
          'Income Data(Families)'
        ),
        React.createElement(
          'button',
          { onClick: function onClick() {
              return _this5.switchDataSet(2);
            } },
          'Income Data(Non Families)'
        ),
        React.createElement(
          XYPlot,
          {
            margin: { left: 50 },
            width: 1000,
            height: 600,
            xType: 'ordinal' },
          React.createElement(VerticalGridLines, null),
          React.createElement(HorizontalGridLines, null),
          React.createElement(VerticalBarSeries, {
            colorType: 'literal',
            data: this.state.currentDataSet }),
          React.createElement(XAxis, { title: 'Amount Earned', style: { title: titleStyle, ticks: tickStyle } }),
          React.createElement(YAxis, { title: 'Population (in thousands)', style: { title: titleStyle, ticks: tickStyle } })
        )
      );
    }
  }]);

  return IncomeVisualization;
}(React.Component);

module.exports = IncomeVisualization;