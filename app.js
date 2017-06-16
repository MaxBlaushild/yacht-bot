'use strict';

const coinigy = require('./coinigy');
const markets = require('./markets');
const Account = require('./models').account;
const Transfer = require('./models').transfer;
const Exchange = require('./models').exchange;
const Market = require('./models').market;
const gemini = require('./exchanges').GMNI;


// gemini.newDepositAddress('BTC').then(console.log).catch(console.log);

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

// gdax.deposit('0.586').then(console.log).catch(console.log);
// =============== transfer from one exchange to another
Promise.all([
  Exchange.findByCode('GMNI'),
  Exchange.findByCode('GDAX')
]).then((exchs) => {
  const toExchange = exchs[0];
  const fromExchange = exchs[1];

  return toExchange
    .getAddress()
    .then(toAddress => fromExchange.transfer('0.002', toAddress));
})
.then(console.log)
.catch(console.log);

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


// =========== SUBSCRIBING TO TRADE FEED
// coinigy.socket
// 	.connect()
// 	.then(coinigy.getExchanges)
//   .then((exchs) => {
//     // exchs.forEach((exch) => {
//       let channel = `TRADE-GDAX--ETH--USD`;
//       coinigy.socket.subscribe(channel, console.log);
//     // });
//   });

// ============ PLACING AN ORDER
// Exchange
//   .findByCode('GDAX')
//   .then(exch => exch.buy('ETH/USD', 0.1, 350))
//   .then(console.log);
//   .catch(console.log);

