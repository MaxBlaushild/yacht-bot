'use strict';

const socketCluster = require('socketcluster-client');
const config = require('./config');
const profiles = require('./profiles');

var socket;
var subscriptions = [];
var authenticated = false;

const connect = () => {
	return new Promise((resolve, reject) => {
    socket = socketCluster.connect(config.socket);
		socket.on('connect', () => {
	    socket.emit("auth", profiles.max, (err, token) => {
	    	authenticated = err ? false : true;
	    	authenticated ? resolve() : reject();
	    });
		});
	});
}

const subscribe = (channel, callback) => {
	if (!authenticated) {
		throw new Error('Must be connected to subscribe.');
	}

	socket
		.subscribe(channel)
		.watch(callback);
}

module.exports = {
	connect,
	subscribe
};
