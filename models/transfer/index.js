'use strict';

module.exports = (sequelize, DataTypes) => {
  const Transfer = sequelize.define('transfer', {
    to_address_id: DataTypes.INTEGER,
    from_address_id: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
  }, {
    classMethods: {
      associate: (models) => {
        Transfer.belongsTo(models.address, {
          as: 'ToAddress',
          foreignKey: 'to_address_id'
        });

        Transfer.belongsTo(models.address, {
          as: 'FromAddress',
          foreignKey: 'from_address_id'
        });
      }
    }
  });

  return Transfer;
};
