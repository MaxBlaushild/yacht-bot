'use strict';

const Poloniex = require('poloniex-api-node');
const config = require('./config');

const client = new Poloniex(config.apiKey, config.apiSecret);

const getBalances = () => {
  return new Promise((resolve, reject) => {
    client.returnBalances(unwrapResponse(resolve, reject));
  });
};

const getDepositAddress = () => {
  return new Promise((resolve, reject) => {
    client.returnDepositAddresses(unwrapResponse(resolve, reject));
  }).then(wallets => wallets.BTC);
};

const unwrapResponse = (resolve, reject) => {
  return (err, result) => {
    err ? reject(err) : resolve(result);
  };
};

const transfer = (amount, toAddress) => {
  return new Promise((resolve, reject) => {
    client.withdraw('BTC', amount, toAddress.address, unwrapResponse(resolve, reject));
  })
};

const getCurrencies = () => {
  return new Promise((resolve, reject) => {
    client.returnCurrencies(unwrapResponse(resolve, reject));
  }).then(res => Object.keys(res));
}

module.exports = {
  getBalances,
  getDepositAddress,
  transfer,
  getCurrencies
};
