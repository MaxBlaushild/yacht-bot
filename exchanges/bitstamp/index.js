'use strict';

const Bitstamp = require('bitstamp');
const config = require('./config');

const client = new Bitstamp(config.key, config.secret, config.customerID);

const getDepositAddress = () => {
  return new Promise((resolve, reject) => {
    client.bitcoin_deposit_address(unwrapResponse(resolve, reject));
  });
}

const unwrapResponse = (resolve, reject) => {
  return (err, data) => {
    err ? reject(err) : resolve(data);
  };
};

module.exports = {
  getDepositAddress
};
