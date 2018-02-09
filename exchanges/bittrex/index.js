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
  return (data, secondthing) => {
      if (data === false) {
        reject(new Error('Something is broken?'));
      }

      if (typeof data === 'object') {
        resolve(data);
      }
  };
};

const getBalance = (currency) => {
  return new Promise((resolve, reject) => {
    bittrex.getbalance({ currency }, unwrapResponse(resolve, reject));
  });
}

const transfer = (quantity, address) => {
  const transfer = {
    currency: 'BTC',
    quantity,
    address
  };

  return new Promise((resolve, reject) => {
    bittrex.withdraw(transfer, unwrapResponse(resolve, reject));
  });
};

module.exports = {
  getDepositAddress,
  getBalance,
  transfer
};
