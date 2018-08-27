'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

var IncomeVisualization = require('./incomeVisualization.js');
var UserInformation = require('./userInformation.js');
class CensusApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      income: 0,
      countyIncomeData: [],
    }
    this.updateIncomeData = this.updateIncomeData.bind(this);
  }

  updateIncomeData(income, countyIncomeData) {
    this.setState((prevState, props) => {
      return {
        income: income,
        countyIncomeData: countyIncomeData,
      }
    });
  }

  render() {
    return (
        <div>
            <UserInformation updateIncomeData={this.updateIncomeData}/>
            <IncomeVisualization income={this.state.income} countyIncomeData={this.state.countyIncomeData}/>
        </div>
    );
  }
}

let domContainer = document.querySelector('#censusApp');
ReactDOM.render(<CensusApp />, domContainer);