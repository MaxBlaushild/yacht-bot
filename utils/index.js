'use strict';

const encryption = require('./encryption');

const sleep = (delay) => {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

module.exports = {
  encryption,
  sleep
};
