'use strict';

const Gemini = require('gemini-api').default;
const config = require('./config');
const sleep = require('./../../utils').sleep;

const client = new Gemini(config);

const getDepositAddress = () => {
  return client.newDepositAddress('BTC')
    .then(addr => addr.address);
};

const pollForDepositSuccess = (currency) => {
  return getBalances().then((balances) => {
    let currencyBalance = balances[currency];
    if (currencyBalance < 0.5) {
      sleep(5000)
      return pollForDepositSuccess(currency);
    } else {
      return currencyBalance;
    }
  });
}

const getPrice = () => {
  return client.getTicker('ethbtc');
};

const transferAll = (currency, toAddress) => {
  return getBalance(currency).then((balance) => {
    return transfer(currency, balance, toAddress)
  });
};

const getBalances = () => {
 return client.getMyAvailableBalances()
  .then((bs) => {
    let balances = {};
    bs.forEach((balance) => {
      balances[balance.currency] = balance.availableForWithdrawal;
    });
    return balances
  });
}

const getBalance = (currency) => {
  return getBalances().then(bs => bs[currency]);
}

const transfer = (currency, amount, toAddress) => {
  console.log(currency)
  console.log(amount)
  console.log(toAddress)
  const transfer = {
    address: toAddress.address,
    amount
  };

  return client.withdraw(currency, transfer);
};

module.exports = {
  getDepositAddress,
  transfer,
  getBalances,
  pollForDepositSuccess,
  getPrice,
  getBalance
};
