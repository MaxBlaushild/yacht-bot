'use strict';

const encryption = require('./../../utils').encryption;

module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('address', {
    address: {
      type: DataTypes.STRING,
      get,
      set
    }
  }, {
    classMethods: {
      associate: (models) => {
        Address.belongsTo(models.exchange);

        Address.hasMany(models.transfer, {
          foreignKey: 'to_address_id',
          'as': 'ToTransfers'
        });

        Address.hasMany(models.transfer, {
          foreignKey: 'from_address_id',
          'as': 'FromTransfers'
        });
      }
    }
  });

  return Address;
};

function get() {
  let unencryptedValue = this.getDataValue('address');
  return unencryptedValue ? encryption.decrypt(unencryptedValue) : '';
}

function set(value) {
  let valueToSet = value ? encryption.encrypt(value) : '';
  this.setDataValue('address', valueToSet);
}

