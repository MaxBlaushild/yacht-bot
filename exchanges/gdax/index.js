'use strict';

const GDAX = require('gdax');
const config = require('./config');
const coinbase = require('./../coinbase');

let client = new GDAX.AuthenticatedClient(config.apiKey, config.apiSecret, config.passphrase, config.apiURI);
client.productID = 'ETH-USD'

const getAccounts = () => {
  return new Promise((resolve, reject) => {
    client.getAccounts(unwrapResponse(resolve, reject));
  });
};

const exposesAddress = () => {
  return this.getAddress().then(address => !!address);
};

const getBalances = () => {
  let balances = {};
  return getAccounts().then((accts) => {
    accts.forEach((acct) => {
      balances[acct.currency] = acct.balance;
    });
    return balances;
  });
}

const getBalance = (currency) => {
  return getBalances().then(bs => bs[currency]);
}

const deposit = (currency, amount) => {
  return coinbase
    .getMyAccount()
    .then((account) => {
      const deposit = {
        amount,
        currency,
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
  transfer,
  getBalances,
  getBalance,
  client
};
