import React, { Component } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

class HistogramVizBox extends Component {
    /**
    * A Box to display histograms.
    * Takes in data and index, and displays histogram.
    * @extends React.Component
    */

    constructor(props) {
        super(props);
        this.state = {};
    }

    options(xaxis, yaxis) {
      return {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `${xaxis} vs ${yaxis}`,
          },
        },
      }
    };

    render() {
      return (
        <Bar options={this.options(this.props.labels.xaxis, this.props.labels.yaxis)} data={this.props.data} />
      )
    }
}
  
export default HistogramVizBox;
  