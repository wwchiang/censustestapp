'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');

var IncomeVisualization = require('./incomeVisualization.js');
var UserInformation = require('./userInformation.js');

var CensusApp = function (_React$Component) {
  _inherits(CensusApp, _React$Component);

  function CensusApp(props) {
    _classCallCheck(this, CensusApp);

    var _this = _possibleConstructorReturn(this, (CensusApp.__proto__ || Object.getPrototypeOf(CensusApp)).call(this, props));

    _this.state = {
      income: 0,
      countyIncomeData: []
    };
    _this.updateIncomeData = _this.updateIncomeData.bind(_this);
    return _this;
  }

  _createClass(CensusApp, [{
    key: 'updateIncomeData',
    value: function updateIncomeData(income, countyIncomeData) {
      this.setState(function (prevState, props) {
        return {
          income: income,
          countyIncomeData: countyIncomeData
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(UserInformation, { updateIncomeData: this.updateIncomeData }),
        React.createElement(IncomeVisualization, { income: this.state.income, countyIncomeData: this.state.countyIncomeData })
      );
    }
  }]);

  return CensusApp;
}(React.Component);

var domContainer = document.querySelector('#censusApp');
ReactDOM.render(React.createElement(CensusApp, null), domContainer);