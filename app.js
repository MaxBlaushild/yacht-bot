'use strict';

const coinigy = require('./coinigy');

coinigy
	.connect()
	.then(() => {
		coinigy.subscribe("ORDER-BITF--ETH--BTC", console.log);
    coinigy.subscribe("BLOCK-LTC", console.log);
    coinigy.subscribe("TRADE-OK--BTC--CNY", console.log);
	});

