'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

var IncomeVisualization = require('./incomeVisualization.js');
var UserInformation = require('./userInformation.js');
class CensusApp extends React.Component {
  constructor(props) {
    super(props);

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

  componentDidMount() {
    // this.loadCountyData();
  }

  updateVisualization(event) {
    
  }

  render() {
    return (
        <div>
            <UserInformation/>
            <IncomeVisualization/>
        </div>
    );
  }
}

let domContainer = document.querySelector('#censusApp');
ReactDOM.render(<CensusApp />, domContainer);