import React from 'react';
const Chart = require('chart.js');

class StockChart extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const convertStringToDollars = function (array) {
      return array.map(number => {
        let num = parseFloat(number)
        // num = num.toFixed(2);
        // num = "$" + num;
        return num.toFixed(2)
      })
    }

    const ctx = document.getElementById('myChart');
    const myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.props.bitcoinPriceDates,
        datasets: [{
          label: 'Bitcoin Price in USD',
          data: convertStringToDollars(this.props.bitcoinPriceValues),
          backgroundColor: 'rgba(255,153,0,0.5)',
          borderColor: 'rgb(0,0,0)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        },
        maintainAspectRatio: false
      }
    });

    return (
      <div>
        <h1>Last 30 Days</h1>
      </div >
    )
  }
}

export default StockChart;