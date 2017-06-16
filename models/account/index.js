'use strict';

const encryption = require('./../../utils').encryption;

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('account', {
    auth_id: DataTypes.INTEGER,
    exch_id: DataTypes.INTEGER,
    coinigy_trade_enabled: DataTypes.BOOLEAN,
    exch_trade_enabled: DataTypes.BOOLEAN,
    api_nickname: DataTypes.STRING,
    api_key: {
      type: DataTypes.STRING,
      get,
      set: set('api_key')
    },
    api_secret: {
      type: DataTypes.STRING,
      get,
      set: set('api_secret')
    },
  }, {
    classMethods: {
      associate: (models) => {
        Account.belongsTo(models.exchange, {
          sourceKey: 'exch_id',
          foreignKey: 'exch_id'
        });
      }
    }
  });

  return Account;
};

const get = () => {
  let unencryptedValue = this.getDataValue('value');
  return unencryptedValue ? encryption.decrypt(unencryptedValue) : '';
}

const set = (columnName) => {
  let setCallback = function(value) {
    let valueToSet = value ? encryption.encrypt(value) : '';
    this.setDataValue(columnName, valueToSet);
  };

  setCallback.bind(this);
  return setCallback;
}
