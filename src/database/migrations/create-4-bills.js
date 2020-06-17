export default {
  up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(() => queryInterface.createTable('Bills', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      userId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      accountId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Accounts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      airtime: {
        type: Sequelize.ENUM('Airtel', 'Mtn', 'Glo', '9 mobile'),
        allowNull: true,
      },
      electricity: {
        type: Sequelize.ENUM('Abuja Electricity', 'Benin Electricity Distribution', 'Eko Electricity', 'Ibadan Electricity'),
        allowNull: true,
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      meterNo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }));
  },
  down: (queryInterface) => queryInterface.dropTable('Bills')
};
