'use strict';

const types = {
  buy: {
    id: "1",
    "order": "5"
  },
  sell : {
    order_type_id: 2,
    order: "10"
  }
};

const prices =  {
  limit: {
    id: "3",
    order: "15"
  },
  stopLimit: {
    "price_type_id": "6",
    "order": "30"
  },
  limitMargin: {
    "price_type_id": "8",
    "order": "50"
  },
  stopLimit: {
    "price_type_id": "9",
    "order": "60"
  }
};

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    auth_id: DataTypes.INTEGER,
    exch_id: DataTypes.INTEGER,
    mkt_id: DataTypes.INTEGER,
    order_type_id: DataTypes.INTEGER,
    price_type_id: DataTypes.INTEGER,
    limit_price: DataTypes.DECIMAL,
    order_quantity: DataTypes.DECIMAL
  });

  Order.types = types;
  Order.prices = prices;

  return Order;
};
