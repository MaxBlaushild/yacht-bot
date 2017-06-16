'use strict';

const Kraken = require('kraken-api');
const config = require('./config');

const client = new Kraken(config.apiKey, config.apiSecret);

const getBalance = () => {
  return new Promise((resolve, reject) => {
    client.api('Balance', null, unwrapResponse(resolve, reject));
  });
};

const getDepositAddress = () => {
  return new Promise((resolve, reject) => {
    client.api('DepositAddresses', {
      asset: 'XXBT',
      method: 'Bitcoin'
    }, unwrapResponse(resolve, reject))
  }).then(res => res.result[0].address);
}

const getAssets = () => {
  return new Promise((resolve, reject) => {
    client.api('Assets', null, unwrapResponse(resolve, reject));
  });
}

const transfer = (amount, toAddress) => {
 return toAddress.getExchange().then((exch) => {
    return new Promise((resolve, reject) => {
      client.api('Withdraw', {
        asset: 'XXBT',
        key: exch.exch_code,
        amount
      }, unwrapResponse(resolve, reject));
    });
  });
};

const getDepositMethods = () => {
  return new Promise((resolve, reject) => {
    const asset = 'XXBT';
    client.api('DepositMethods', { asset }, unwrapResponse(resolve, reject));
  });
};

const unwrapResponse = (resolve, reject) => {
  return (err, data) => {
    console.log(err)
    console.log(data);
    err ? reject(err) : resolve(data);
  };
};

module.exports = {
  getBalance,
  getDepositMethods,
  getAssets,
  getDepositAddress,
  transfer
};
