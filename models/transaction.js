'use strict';
module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define('Transaction', {
    date: DataTypes.DATE,
    amountPaid: DataTypes.INTEGER,
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Snacks',
        key: 'id'
      }
    }
  });
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Snacks, {foreignKey: 'itemId'});
  };
  return Transaction;
};
