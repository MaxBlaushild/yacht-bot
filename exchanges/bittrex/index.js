'use strict';

const bittrex = require('node.bittrex.api');
const config = require('./config');

bittrex.options(config);

const getDepositAddress = () => {
  return new Promise((resolve, reject) => {
    bittrex.getbalance({ currency : 'BTC' }, unwrapResponse(resolve, reject));
  }).then(wallet => wallet.CryptoAddress);
};

const unwrapResponse = (resolve, reject) => {
  return (data) => {
      if (data === false) {
        reject(new Error('Something is broken?'));
      }

      if (typeof data === 'object') {
        resolve(data);
      }
  };
};

module.exports = {
  getDepositAddress
};
