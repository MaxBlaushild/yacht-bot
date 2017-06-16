'use strict';

const exchanges = require('./../../exchanges');
const encryption = require('./../../utils/encryption');
const classMethods = require('./classMethods');
const instanceMethods = require('./instanceMethods');

module.exports = (sequelize, DataTypes) => {
  const Exchange = sequelize.define('exchange', {
    exch_name: DataTypes.STRING,
    exch_code: DataTypes.STRING,
    exch_fee: DataTypes.DECIMAL,
    exch_trade_enabled: DataTypes.BOOLEAN,
    exch_balance_enabled: DataTypes.BOOLEAN,
    exch_url: DataTypes.STRING,
    exch_id: {
      type: DataTypes.INTEGER,
      unique: true
    },
    api: {
      type: DataTypes.VIRTUAL,
      get: function() {
        const exchange = exchanges[this.exch_code] || {};
        return exchange;
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        Exchange.hasMany(models.market, {
          sourceKey: 'exch_id',
          foreignKey: 'exch_id'
        });

        Exchange.hasOne(models.account, {
          targetKey: 'exch_id',
          foreignKey: 'exch_id'
        });

        Exchange.hasOne(models.address);
      }
    }
  });

  instanceMethods(Exchange);
  classMethods(Exchange);

  return Exchange;
};
