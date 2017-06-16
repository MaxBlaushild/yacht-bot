'use strict';

class Account {
  constructor(account) {
    this.account = account;
  }

  getTransactions() {
    return new Promise((resolve, reject) => {
      this.account.getTransactions(null, unwrapRequest(resolve, reject));
    });
  }

  transfer(transfer) {
    return new Promise((resolve, reject) => {
      this.account.sendMoney(transfer, unwrapRequest(resolve, reject));
    });
  }

  getAddresses() {
    return new Promise((resolve, reject) => {
      this.account.getAddresses(null, unwrapRequest(resolve, reject));
    });
  }

}

const unwrapRequest = (resolve, reject) => {
  return (err, result) => {
    err ? reject(err) : resolve(result);
  };
};

module.exports = Account;
