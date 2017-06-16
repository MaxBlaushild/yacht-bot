'use strict';

const coinbase = require('coinbase');
const config = require('./config');
const Account = require('./models').Account;
const client = new coinbase.Client(config);

const getMyAccount = () => {
  const id = process.env.COINBASE_ACCOUNT_ID;
  return new Promise((resolve, reject) => {
    client.getAccount(id, (err, acct) => {
      const account = new Account(acct);
      err ? reject(err) : resolve(account);
    });
  });
};

const mostRecentTransaction = () => {
  getMyAccount()
  .then(acct => acct.getTransactions())
  .then(txns => txns[0]);
};

const getDepositAddress = () => {
  getMyAccount()
  .then(acct => acct.getAddresses())
  .then(addrs => addrs[0].address)
};

const transfer = (amount, toAddress) => {
  return getMyAccount()
          .then(account => account.transfer({
            to: toAddress.address,
            amount,
            currency: 'BTC',
            'description': 'From your friendly neighborhood bot.'
          }));
};

module.exports = {
  getMyAccount,
  mostRecentTransaction,
  getDepositAddress,
  transfer
};

