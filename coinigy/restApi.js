'use strict';

const request = require('request-promise-native');
const config = require('./config');
const _ = require('lodash');

function makeOptions(uri, method, data) {
	let options = _.clone(config.restApi);
	options.uri = `${options.uri}${uri}`;
	options.method = method;
	options.data = data;
	return options;
}

function makeRequest(uri, method, data) {
	let options = makeOptions(uri, method, data);
	return request(options)
          .then(response => JSON.parse(response))
          .then(response => response.data);
}

function getUserInfo() {
	return makeRequest('/userInfo', 'POST');
}

function getExchanges() {
  return makeRequest('/exchanges', 'POST');
}

module.exports = {
	getUserInfo,
  getExchanges
};
