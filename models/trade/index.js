'use strict';

module.exports = (sequelize, DataTypes) => {
  const Trade = sequelize.define('trade', {
    exchange: DataTypes.STRING,
    label: DataTypes.STRING,
    time: DataTypes.DATE,
    timestamp: DataTypes.DATE,
    price: DataTypes.DECIMAL,
    quantity: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    type: DataTypes.STRING,
    channel: DataTypes.STRING
  });

  return Trade;
};
