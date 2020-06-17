export default (sequelize, DataTypes) => {
  const Bill = sequelize.define('Bills', {
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
      allowNull: true,
      references: {
        model: 'Accounts',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    airtime: {
      type: DataTypes.ENUM('Airtel', 'Mtn', 'Glo', '9 mobile'),
      allowNull: true,
    },
    electricity: {
      type: DataTypes.ENUM('Abuja Electricity', 'Benin Electricity Distribution', 'Eko Electricity', 'Ibadan Electricity'),
      allowNull: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    meterNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Bill;
};
