'use strict';

const profiles = require('./profiles');

module.exports = {
	socket: {
		hostname: 'sc-02.coinigy.com',
  	port: '443',
  	secure: 'true'
	},
	restApi: {
		uri: 'https://api.coinigy.com/api/v1',
		headers: {
			'Content-Type': 'application/json',
			'X-API-KEY': profiles.max.apiKey,
			'X-API-SECRET': profiles.max.apiSecret
		}
	}
};
