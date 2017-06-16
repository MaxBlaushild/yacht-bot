'use strict';

const request = require('request-promise-native');
const config = require('./config');
const _ = require('lodash');

const makeOptions = (uri, method, data) => {
	let options = _.clone(config.restApi);
	options.uri = `${options.uri}${uri}`;
	options.method = method;
	options.body = JSON.stringify(data);
	return options;
}

const makeRequest = (uri, method, data) => {
	let options = makeOptions(uri, method, data);
	return request(options).then(response => JSON.parse(response));
}

const getUserInfo = () => {
	return makeRequest('/userInfo', 'POST').then(response => response.data);
}

const getExchanges = () => {
  return makeRequest('/exchanges', 'POST').then(response => response.data);
}

const getMarketsForExchange = (exhange_code) => {
  return makeRequest('/markets', 'POST', { exhange_code }).then(response => response.data);
}

const placeOrder = (order) => {
  return makeRequest('/addOrder', 'POST', order);
}

const getAccounts = () => {
  return makeRequest('/accounts', 'POST').then(response => response.data);
}

const addApiKey = (apiKey) => {
  return makeRequest('/addApiKey', 'POST', apiKey);
}

const removeApiKey = (apiKey) => {
  return makeRequest('/deleteApiKey', 'POST', apiKey);
}

const getOrders = () => {
  return makeRequest('/orders', 'POST').then(response => response.data);
}

const getBalances = () => {
  return makeRequest('/balances', 'POST').then(response => response)
}

module.exports = {
	getUserInfo,
  getExchanges,
  placeOrder,
  getAccounts,
  placeOrder,
  addApiKey,
  removeApiKey,
  getOrders,
  getMarketsForExchange
};
