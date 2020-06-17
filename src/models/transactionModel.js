export default (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transactions', {
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    accountId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Accounts',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    category: {
      type: DataTypes.ENUM('transfer money', 'pay airtime', 'pay for electricity'),
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    walletNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    walletBalance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Bills, { as: 'accountBills', foreignKey: 'billId' });
  };
  return Transaction;
};
