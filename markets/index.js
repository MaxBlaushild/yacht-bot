'use strict';

const markets = {}

function sync(data) {
  markets[data.exchange] = data.price;
  console.log(markets);
}

module.exports = {
  sync
};
