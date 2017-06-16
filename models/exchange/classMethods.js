'use strict';

const coinigy = require('./../../coinigy');

module.exports = (Model) => {
  Model.findByCode = findByCode;
  Model.populate = populate;
};

function populate() {
  return coinigy
          .restApi
          .getExchanges()
          .then(this.bulkCreate.bind(this));
}

function findByCode(exch_code) {
  return this.findOne({
    where: {
      exch_code
    }
  });
}
