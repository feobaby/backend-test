export default (sequelize, DataTypes) => {
  const Account = sequelize.define('Accounts', {
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
    walletNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    walletBalance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
  Account.associate = (models) => {
    Account.hasMany(models.Transactions, { as: 'accountTransactions', foreignKey: 'accountId' });
    Account.belongsTo(models.Users, { as: 'details', foreignKey: 'userId' });
  };
  return Account;
};
