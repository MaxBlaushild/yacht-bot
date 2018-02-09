'use strict';

const Trade = require('./../models').trade;

const markets = {}

const sync = (channel) => {
  markets[channel] = {};

  return (trade) => {
    markets[channel][trade.exchange] = trade.price;
    console.log(markets);
  }

  // Trade.create(trade);
}

module.exports = {
  sync
};
