'use strict';

const GDAX = require('gdax');
const config = require('./config');
const coinbase = require('./../coinbase');

const client = new GDAX.AuthenticatedClient(config.apiKey, config.apiSecret, config.passphrase, config.apiURI);

const getAccounts = () => {
  return new Promise((resolve, reject) => {
    client.getAccounts(unwrapResponse(resolve, reject));
  });
};

const exposesAddress = () => {
  return this.getAddress().then(address => !!address);
};

const deposit = (amount) => {
  return coinbase
    .getMyAccount()
    .then((account) => {
      const deposit = {
        amount,
        currency: 'BTC',
        coinbase_account_id: account.account.id
      };

      return new Promise((resolve, reject) => {
        client.deposit(deposit, unwrapResponse(resolve, reject));
      });
    });
};

const transfer = (amount, toAddress) => {
  const transfer = {
    crypto_address: toAddress.address,
    currency: 'BTC',
    amount
  };

  return new Promise((resolve, reject) => {
    client.withdraw(transfer, unwrapResponse(resolve, reject));
  });
};

const unwrapResponse = (resolve, reject) => {
  return (err, response, data) => {
    err || !response ? reject(err || new Error('Nothing happened!')) : resolve(data);
  };
};

module.exports = {
  getAccounts,
  deposit,
  transfer
};
