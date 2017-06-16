'use strict';

const Gemini = require('gemini-api').default;
const config = require('./config');

const client = new Gemini(config);

const getDepositAddress = () => {
  return client.newDepositAddress('BTC')
    .then(addr => addr.address);
};

const transfer = (amount, toAddress) => {
  const transfer = {
    address: toAddress.address,
    amount
  };

  return client.withdraw('BTC', transfer);
};

module.exports = {
  getDepositAddress
};
