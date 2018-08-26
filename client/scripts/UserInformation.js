'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var states = require('../data/state-codes.js');
var React = require('react');
var ReactDOM = require('react-dom');

var URL = Object.freeze({
    BASE: 'http://localhost:3000/',
    GET_INCOME: 'incomes?',
    GET_COUNTY: 'counties?',
    STATE: 'state=',
    SELECTED_COUNTY: 'county=',
    AND: '&'
});

function buildURL(selector) {
    var stateCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var county = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var queryURL = URL.BASE + selector;

    if (stateCode != null) {
        queryURL += URL.STATE + stateCode;
        if (county != null) {
            queryURL += URL.AND + URL.COUNTY + county;
        }
    }

    return queryURL;
}

var UserInformation = function (_React$Component) {
    _inherits(UserInformation, _React$Component);

    function UserInformation(props) {
        _classCallCheck(this, UserInformation);

        // this.state = { liked: false };
        var _this = _possibleConstructorReturn(this, (UserInformation.__proto__ || Object.getPrototypeOf(UserInformation)).call(this, props));

        _this.state = {
            jsonData: null,
            stateCodes: states,
            countyCodes: [],
            selectedStateCode: states[0].code,
            selectedCountyCode: "",
            isLoading: false
        };

        _this.handleStateSelect = _this.handleStateSelect.bind(_this);
        _this.handleCountySelect = _this.handleCountySelect.bind(_this);
        _this.updateVisualization = _this.updateVisualization.bind(_this);
        return _this;
    }

    _createClass(UserInformation, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadCountyData();
        }
    }, {
        key: 'handleStateSelect',
        value: function handleStateSelect(event) {
            var stateCode = event.target.value;
            this.setState(function (prevState, props) {
                return {
                    selectedStateCode: stateCode,
                    isLoading: true
                };
            }, this.loadCountyData);
        }
    }, {
        key: 'handleCountySelect',
        value: function handleCountySelect(event) {
            var countyCode = event.target.value;
            this.setState(function (prevState, props) {
                return {
                    selectedCountyCode: countyCode
                };
            });
        }
    }, {
        key: 'loadCountyData',
        value: function loadCountyData() {
            var controller = this;
            fetch(buildURL(URL.GET_COUNTY, this.state.selectedStateCode)).then(function (response) {
                response.json().then(function (data) {
                    data.shift(); //The first element of the array is the CSV header.
                    controller.setState(function (prevState, props) {
                        return {
                            countyCodes: data,
                            selectedCountyCode: data[0][2],
                            isLoading: false
                        };
                    });
                });
            });
        }
    }, {
        key: 'isCountyDataAvailable',
        value: function isCountyDataAvailable() {
            return !this.state.isLoading && this.state.countyCodes !== null && this.state.countyCodes.length > 0;
        }
    }, {
        key: 'updateVisualization',
        value: function updateVisualization(event) {
            var _this2 = this;

            console.log("Updating Viz");
            event.preventDefault();
            var controller = this;
            var data = {
                income: controller.refs.incomeInput.value
            };

            controller.setState(function (prevState, props) {
                return {
                    isLoading: true
                };
            }, function () {
                fetch(buildURL(URL.GET_INCOME, _this2.state.selectedStateCode, _this2.state.selectedCountyCode)).then(function (response) {
                    response.json().then(function (data) {
                        controller.setState(function (prevState, props) {
                            return {
                                isLoading: false
                            };
                        });
                        console.log(data);
                    });
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { ref: 'incomeForm' },
                    React.createElement(
                        'div',
                        null,
                        'State',
                        React.createElement(
                            'select',
                            { name: 'State Code', value: this.state.selectedStateCode, onChange: this.handleStateSelect },
                            this.state.stateCodes.map(function (stateInfo) {
                                return React.createElement(
                                    'option',
                                    { key: stateInfo.code, value: stateInfo.code },
                                    stateInfo.name
                                );
                            })
                        )
                    ),
                    React.createElement(
                        'div',
                        null,
                        'County',
                        React.createElement(
                            'select',
                            { disabled: !this.isCountyDataAvailable(), name: 'County Code', value: this.state.selectedCountyCode, onChange: this.handleCountySelect.bind(this) },
                            this.state.countyCodes.map(function (countyInfo) {
                                return React.createElement(
                                    'option',
                                    { key: countyInfo[2], value: countyInfo[2] },
                                    countyInfo[0]
                                );
                            })
                        )
                    ),
                    React.createElement('input', { disabled: !this.isCountyDataAvailable(), type: 'number', ref: 'incomeInput', placeholder: 'Income' }),
                    React.createElement(
                        'button',
                        { disabled: !this.isCountyDataAvailable(), onClick: this.updateVisualization },
                        'Submit Information'
                    )
                )
            );
        }
    }]);

    return UserInformation;
}(React.Component);

module.exports = UserInformation;