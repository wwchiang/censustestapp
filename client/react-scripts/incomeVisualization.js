'use strict';
// var states = require('../data/state-codes.js');
var React = require('react');
var ReactDOM = require('react-dom');
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
      }
  }
      
  render() {
    return (
      <div>
        <XYPlot 
          xType="ordinal"
          xDistance={100}
          width={300}
          height={300}>
          <VerticalGridLines />
          <HorizontalGridLines/>
          <XAxis title="X" />
          <YAxis />
          <VerticalBarSeries
            color="red"
            data={[
              {x: 1, y: 10},
              {x: 2, y: 5},
              {x: 3, y: 15}
            ]}/>
        </XYPlot>
      </div>
    );
  }
}

module.exports = IncomeVisualization;