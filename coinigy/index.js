'use strict'

const socket = require('./socket');
const restApi = require('./restApi');

module.exports = {
	connect: socket.connect,
	subscribe: socket.subscribe,
	getUserInfo: restApi.getUserInfo
};