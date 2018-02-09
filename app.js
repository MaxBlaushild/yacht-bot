'use strict';

const coinigy = require('./coinigy');
const markets = require('./markets');
const Account = require('./models').account;
const Transfer = require('./models').transfer;
const Exchange = require('./models').exchange;
const Market = require('./models').market;
const poloniex = require('./exchanges').PLNX;
const gemini = require('./exchanges').GMNI;
const gdax = require('./exchanges').GDAX;
const express = require('express');
const coinbase = require('./exchanges').CNBS;

// const app = express();

// app.get('/eth/price', function (req, res) {
//   res.send('Hello World!')
// });

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// });

coinbase.getDepositAddress().then((addr) => {
  return Exchange.findByCode('BTRX').then((exch) => {
    const bittrex = exch.api;
    return bittrex.getBalance('BTC').then((account) => {
      const balance = account.Balance;
      // console.log(balance);
      return bittrex.transfer('0.025', addr).then(console.log);
    });
  });
});



// =========== SUBSCRIBING TO TRADE FEED]]

// Exchange.findByCode('GDAX').then((exch) => {
//   exch.api.client.getProductTicker((err, result, data) => {
//     console.log(err);
//     console.log(data);
//   })
// });

// const currencies = [
//   'ETH',
//   'SC',
//   'ZEC',
//   'STEEM',
//   'FLO',
//   'AMP',
//   'ADRD',
//   'MAID',
//   'SNG',
//   'GUP',
//   'LTC',
//   'XRP',
//   'DGB',
//   'ETC',
//   'NXT',
//   'LBC',
//   'STRAT'
// ];

// gdax.deposit('ETH', '1.0').then(console.log).catch(console.log);
// console.log('heya')
// coinigy.socket
//   .connect()
//   .catch(console.log)
//   .then(() => {
//     console.log('yasss')
//     return Promise.all([
//       coinigy.restApi.getExchanges(),
//       poloniex.getCurrencies()
//     ]);
//   })
//   .then((result) => {
//     let exchs = result[0];
//     let currencies = result[1];

//     exchs.forEach((exch) => {
//       // currencies.forEach((cur) => {
//         let cur = 'ETH';
//         let channel = `TRADE-${exch.exch_code}--BTC--${cur}`;
//         let channelTwo = `TRADE-${exch.exch_code}--${cur}--BTC`;
//         coinigy.socket.subscribe(channel, markets.sync(`BTC--${cur}`));
//         coinigy.socket.subscribe(channelTwo, markets.sync(`${cur}--BTC`));
//       // });
//     });
//   });
// console.log(new Date());
// gemini.pollForDepositSuccess('BTC').then(() => { console.log(new Date()); }).catch(console.log)

// gdax.getAccounts().then(console.log).catch(console.log)

// Exchange
//   .findByCode('GMNI')
//   .then(e => e.api.getBalance('BTC'))
//   .then(console.log)
//   .catch(console.log);

// // gemini.getPrice('BTC').then(console.log).catch(console.log)

// gdax.getBalance('BTC').then((btcBalance) => {
//   Promise.all([
//     Exchange.findByCode('GDAX'),
//     Exchange.findByCode('GMNI')
//   ]).then((exchs) => {
//     const fromExchange = exchs[0];
//     const toExchange = exchs[1];
//     console.log('doing it')
//     return toExchange
//       .getAddress()
//       .then(toAddress => fromExchange.transfer(btcBalance, toAddress));
//   }).then(console.log).catch(console.log)
// })

// Exchange
// .findByCode('GDAX')
// .then((e) => {
//   return e.api.
//     transfer('0.1', { address: '3LvHiCTcc1pSRZaEZz7hYW5tCCuzHtUp1L'})
//     .then(console.log);
// }).catch(console.log);

// gemini.newDepositAddress('BTC').then(console.log).catch(console.log);
// Exchange.findByCode('GMNI').then((exch) => {
//   const address = '15V7VuwNWr2LjS6JDN38kr2sDPKmbn1UfM';
//   return exch.api.transfer('BTC', '0.07s', { address });
// }).then(console.log).catch(console.log);
// Exchange.findByCode("GMNI")
//   .then(e => e.populateAddress())
//   .then(console.log)
//   .catch(console.log);

// Exchange.findByCode('PLNX').then((plnx) => {
//   return plnx
//     .getAddress()
//     .then((addr) => {
//       return gdax.transferToAddress('0.001', addr);
//     });
// })
// .then(console.log)
// .catch(console.log);

// Exchange.findByCode('BITS').then(e => e.populateAddress()).then(console.log).catch(console.log);

// gdax.deposit('0.586').then(console.log).catch(console.log);
// =============== transfer from one exchange to another
// Promise.all([
//   Exchange.findByCode('GDAX'),
//   Exchange.findByCode('BITS')
// ]).then((exchs) => {
//   const fromExchange = exchs[0];
//   const toExchange = exchs[1];

//   return toExchange
//     .getAddress()
//     .then(toAddress => fromExchange.transfer('0.002', toAddress));
// })
// .then(console.log)
// .catch(console.log);

// ============ populating stuff
// Exchange.populate();
// Exchange.findByCode('BTRX').then(e => e.populateAddress()).then(console.log).catch(console.log);
// Exchange
//   .findByCode('KRKN')
//   .then(exch => exch.populateAddress())
//   .then(console.log)
//   .catch(console.log);

// ============ poll the most recent transaction until status changes
// coinbase
//   .getMyAccount()
//   .then(account => account.mostRecentTransaction())
//   .then(console.log)
//   .catch(console.log);




// ============ PLACING AN ORDER
// Exchange
//   .findByCode('GDAX')
//   .then(exch => exch.buy('ETH/USD', 0.1, 350))
//   .then(console.log);
//   .catch(console.log);

