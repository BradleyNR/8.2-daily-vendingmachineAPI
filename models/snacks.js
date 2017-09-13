'use strict';
module.exports = function(sequelize, DataTypes) {
  var Snacks = sequelize.define('Snacks', {
    item: DataTypes.STRING,
    description: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    purchased: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    dateBought: DataTypes.STRING,
    paid: DataTypes.INTEGER
  });
  return Snacks;
};
