'use strict';

const Trade = require('./../models').trade;

const markets = {}

const sync = (trade) => {
  markets[trade.exchange] = trade.price;
  Trade.create(trade);
}

module.exports = {
  sync
};
