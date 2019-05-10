import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import StockChart from './stockChart.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bitcoinPrices: '',
      bitcoinPriceDates: [],
      bitcoinPriceValues: []
    }

    this.getBitcoinPriceLast30 = this.getBitcoinPriceLast30.bind(this);
  }

  componentDidMount() {
    this.getBitcoinPriceLast30();
  }

  getBitcoinPriceLast30() {
    let that = this;
    axios.get('/bitcoin')
      .then(function (response) {
        let responseData = response.data.bpi
        that.setState({
          bitcoinPrices: responseData,
          bitcoinPriceDates: Object.keys(responseData),
          bitcoinPriceValues: Object.values(responseData)
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  render() {
    return (
      <div>
        <h1>Bitcoin (BTC) Prices</h1>
        <StockChart bitcoinPriceDates={this.state.bitcoinPriceDates} bitcoinPriceValues={this.state.bitcoinPriceValues} />
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById("app"))

