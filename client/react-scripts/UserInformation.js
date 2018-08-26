'use strict';
const states = require('../data/state-codes.js');
var React = require('react');
var ReactDOM = require('react-dom');

const URL = Object.freeze({
    BASE: 'http://localhost:3000/',
    GET_INCOME: 'incomes?',
    GET_COUNTY: 'counties?',
    STATE: 'state=',
    SELECTED_COUNTY: 'county=',
    AND: '&',
});

function buildURL(selector, stateCode = null, county = null) {
    let queryURL = URL.BASE + selector;

    if (stateCode != null) {
        queryURL += URL.STATE + stateCode;
        if (county != null) {
            queryURL += URL.AND + URL.COUNTY + county;
        }
    }

    return queryURL;
}

class UserInformation extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { liked: false };
    this.state = {
        jsonData: null,
        stateCodes: states,
        countyCodes: [],
        selectedStateCode: states[0].code,
        selectedCountyCode: "",
        isLoading: false,
    }

    this.handleStateSelect = this.handleStateSelect.bind(this);
    this.handleCountySelect = this.handleCountySelect.bind(this);
    this.updateVisualization = this.updateVisualization.bind(this);
  }

  componentDidMount() {
    this.loadCountyData();
  }

  handleStateSelect(event) {
    var stateCode = event.target.value;
    this.setState((prevState, props) => {
        return {
            selectedStateCode: stateCode,
            isLoading: true,
        }
    }, this.loadCountyData);
  }

  
  handleCountySelect(event) {
    var countyCode = event.target.value;
    this.setState((prevState, props) => {
        return {
            selectedCountyCode: countyCode,
        }
    });
  }

  loadCountyData() {
    var controller = this;
    fetch(buildURL(URL.GET_COUNTY, this.state.selectedStateCode)).then(function(response) {
        response.json().then(function(data) {
            data.shift(); //The first element of the array is the CSV header.
            controller.setState((prevState, props) => {
                return {
                    countyCodes: data,
                    selectedCountyCode: data[0][2],
                    isLoading: false,
                }
            })
        });
    });
  }

  isCountyDataAvailable() {
      return !this.state.isLoading && this.state.countyCodes !== null && this.state.countyCodes.length > 0;
  }

  updateVisualization(event) {
    console.log("Updating Viz");
    event.preventDefault();
    var controller = this;
    let data = {
        income: controller.refs.incomeInput.value,
    }
    
    controller.setState((prevState, props) => {
        return {
            isLoading: true,
        }
    }, () => {
        fetch(buildURL(URL.GET_INCOME, this.state.selectedStateCode, this.state.selectedCountyCode)).then(function(response) {
            response.json().then(function(data) {
                controller.setState((prevState, props) => {
                    return  {
                        isLoading: false,
                    }
                });
                console.log(data);
            });
        });
    });
  }

  render() {
    return (
        <div>
            <form ref="incomeForm">
                <div>
                    State 
                    <select name="State Code" value={this.state.selectedStateCode} onChange={this.handleStateSelect}>
                        {this.state.stateCodes.map(stateInfo => 
                            <option key={stateInfo.code} value={stateInfo.code}>
                                {stateInfo.name}
                            </option>
                        )}
                    </select>
                </div>
                <div>
                    County
                    <select disabled={!this.isCountyDataAvailable()} name="County Code" value={this.state.selectedCountyCode} onChange={this.handleCountySelect.bind(this)}>
                        {this.state.countyCodes.map(countyInfo => 
                            <option key={countyInfo[2]} value={countyInfo[2]}>
                                {countyInfo[0]}
                            </option>
                        )}
                    </select>
                </div>
                <input disabled={!this.isCountyDataAvailable()} type="number" ref="incomeInput" placeholder="Income"/>
                <button disabled={!this.isCountyDataAvailable()} onClick={this.updateVisualization}>Submit Information</button>
            </form>
        </div>
    );
  }
}

module.exports = UserInformation;