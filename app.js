'use strict';

const coinigy = require('./coinigy');
const markets = require('./markets');

coinigy
	.connect()
	.then(coinigy.getExchanges)
  .then((exchs) => {
    exchs.forEach((exch) => {
      let channel = `TRADE-${exch.exch_code}--BTC--USD`;
      coinigy.subscribe(channel, markets.sync);
    });
  });

