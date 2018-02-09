'use strict';

const encryption = require('./../../utils').encryption;

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('account', {
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
        Account.belongsTo(models.exchange);
        Account.belongsTo(models.user);
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
