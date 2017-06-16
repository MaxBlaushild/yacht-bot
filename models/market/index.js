'use strict';


module.exports = (sequelize, DataTypes) => {
  const Market = sequelize.define('market', {
    exch_id: DataTypes.INTEGER,
    mkt_id: DataTypes.INTEGER,
    mkt_name: DataTypes.STRING,
    exchmkt_id: DataTypes.INTEGER
  });

  return Market;
};
