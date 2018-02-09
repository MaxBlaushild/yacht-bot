'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // User.hasMany(models.accounts);
      }
    }
  });

  return User;
};
