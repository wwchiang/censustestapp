'use strict';
var React = require('react');
var ReactVis = require('react-vis');

var XYPlot = ReactVis.XYPlot;
var XAxis = ReactVis.XAxis;
var YAxis = ReactVis.YAxis;
var HorizontalGridLines = ReactVis.HorizontalGridLines;
var VerticalGridLines = ReactVis.VerticalGridLines;
var VerticalBarSeries = ReactVis.VerticalBarSeries;

class IncomeVisualization extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        chartWidth: 300,
        chartHeight: 300,
        selectedTab: null,
        dataSets: [],
        currentDataSet: [],
        tickTotal: 10,
        tickValues: [],
      }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.props.countyIncomeData !== prevProps.countyIncomeData || this.props.income !== prevProps.income) {
      this.setState((prevState, props) => {
        return {
          dataSets: this.formatDataSets(this.props.countyIncomeData, this.props.income),
        }
      }, () => {this.switchDataSet(0)});
    }
  }

  formatDataSets(countyIncomeData, userIncome) {
    let dataSets = [];
    dataSets.push(this.formatIncomeSet(countyIncomeData['incomeDataAll'], userIncome));
    dataSets.push(this.formatIncomeSet(countyIncomeData['incomeDataFamilies'], userIncome));
    dataSets.push(this.formatIncomeSet(countyIncomeData['incomeDataNonFamilies'], userIncome));

    return dataSets;
  }

  formatToThousands(amount) {
    if (amount < 1000) return 0;

    return Math.floor(amount / 1000);
  }

  formatIncomeSet(incomeSet, userIncome) {
    let formattedIncome = incomeSet.reduce((data, currentBracket) => {
      let barValue = this.formatToThousands(currentBracket.min) + "K";;
      if (currentBracket.max !== undefined) {
        barValue += " - " + this.formatToThousands(currentBracket.max + 1) + "K";;
      } else {
        barValue += "+";
      }

      let column = {
        x: barValue,
        y: this.formatToThousands(currentBracket.households),
      }

      //If the income is either between brackets or greater than the greatest bracket, give it a unique color.
      if (userIncome >= currentBracket.min && ((currentBracket.max !== undefined && userIncome <= currentBracket.max) || (currentBracket.max === undefined))) {
        column.color = '#3d3dfd';
      } else {
        column.color = '#a2a2fb';
      }

      data.push(column);
      return data;
    }, []);
    return formattedIncome;
  }

  switchDataSet(index) {
    this.setState((prevState, props) => {
      return {
        currentDataSet: this.state.dataSets[index],
        selectedTab: index,
      }
    });
  }
  
  render() {
    const titleStyle = { fontFamily:'Arial', fontSize:'1.2rem', fontWeight:'20' };
    const tickStyle = { fontFamily:'Arial', fontSize:'.9rem', fontWeight:'10'}
    return (
      <div>
        <button onClick={() => this.switchDataSet(0)}>Income Data(All)</button>
        <button onClick={() => this.switchDataSet(1)}>Income Data(Families)</button>
        <button onClick={() => this.switchDataSet(2)}>Income Data(Non Families)</button>
        <XYPlot
          margin={{left:50}}
          width={1000}
          height={600}
          xType="ordinal">
          <VerticalGridLines />
          <HorizontalGridLines/>
          <VerticalBarSeries
            colorType="literal"
            data={this.state.currentDataSet}/>
          <XAxis title="Amount Earned" style={{title: titleStyle, ticks: tickStyle}}/>
          <YAxis title="Population (in thousands)" style={{title: titleStyle, ticks: tickStyle}}/>
        </XYPlot>
      </div>
    );
  }
}

module.exports = IncomeVisualization;