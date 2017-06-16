'use strict';

const coinigy = require('./../../coinigy');

module.exports = (Model) => {
  Model.Instance.prototype.populateAddress = populateAddress;
  Model.Instance.prototype.buy = buy;
  Model.Instance.prototype.newAccount = newAccount;
  Model.Instance.prototype.transfer = transfer;
};

function transfer(amount, toAddress) {
  const Transfer = require('./../../models').transfer;
  const transferMethod = this.api.transfer;

  if (!transferMethod) {
    throw new Error('This method has not been implemented yet.');
    return;
  }
  return transferMethod(amount, toAddress).then(() => {
    return this.getAddress().then((fromAddress) => {
      return Transfer.create({
        to_address_id: toAddress.id,
        from_address_id: fromAddress ? fromAddress || 0,
        amount
      });
    });
  });
}

function populateAddress() {
  const Address = require('./../../models/').address;
  const addressQuery = this.api.getDepositAddress ? this.api.getDepositAddress() : Promise.reject(new Error('This method has not yet been implemented.'));

  return addressQuery
    .then(address => Address.build({ address }))
    .then(address => this.setAddress(address));
};

function buy(mkt_name, order_quantity, limit_price) {
  const Order = require('./../models').order;

  return this.getAccount().then((acct) => {
    return this
      .getMarkets({ where: { mkt_name }})
      .then((markets) => {
        const market = markets[0];
        const order = {
          auth_id: acct.auth_id,
          exch_id: acct.exch_id,
          mkt_id: market.mkt_id,
          order_type_id: Order.types.buy.id,
          price_type_id: Order.prices.limit.id,
          limit_price,
          order_quantity
        };
        return coinigy.restApi.placeOrder(order);
      })
      .then((order) => {
        return Order.create(order);
      });
  });
}

function newAccount(api_key, api_secret) {
  const Account = require('./../models').account;

  let account = {
    api_key: api_key,
    api_secret: api_secret,
    api_exch_id: this.exch_id,
    api_nickname: `Exchange account for ${this.exch_name}.`
  };

  return coinigy
    .restApi
    .addApiKey(account)
    .then((response) => {
      account.auth_id = response.data;
      account.exch_id = this.exch_id;
      return Account.create(account);
    });
}
