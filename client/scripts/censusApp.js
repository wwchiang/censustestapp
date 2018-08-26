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

    return _possibleConstructorReturn(this, (CensusApp.__proto__ || Object.getPrototypeOf(CensusApp)).call(this, props));

    // this.state = {
    //     jsonData: null,
    //     stateCodes: states,
    //     countyCodes: [],
    //     selectedStateCode: states[0].code,
    //     selectedCountyCode: "",
    //     isLoading: false,
    // }

    // this.handleStateSelect = this.handleStateSelect.bind(this);
    // this.handleCountySelect = this.handleCountySelect.bind(this);
    // this.updateVisualization = this.updateVisualization.bind(this);
  }

  _createClass(CensusApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // this.loadCountyData();
    }
  }, {
    key: 'updateVisualization',
    value: function updateVisualization(event) {}
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(UserInformation, null),
        React.createElement(IncomeVisualization, null)
      );
    }
  }]);

  return CensusApp;
}(React.Component);

var domContainer = document.querySelector('#censusApp');
ReactDOM.render(React.createElement(CensusApp, null), domContainer);