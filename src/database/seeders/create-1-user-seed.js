import Helper from '../../utils/bcrypt';

const { hashPassword } = Helper;

export default {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Users',
    [
      {
        id: '7aa38d4e-7fbf-4067-8821-9c27d2fb6e3a',
        fullname: 'Lanre David',
        email: 'lanre@gmail.com',
        password: hashPassword('lanre1234'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'ea38fb9a-57ab-4d07-9c6b-01e0b429d101',
        fullname: 'Funmi Olaiya',
        email: 'funmi@gmail.com',
        password: hashPassword('funmi1234'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'fc3dffae-a942-45a8-bd59-43e6e0c99ee7',
        fullname: 'Toye Matthews',
        email: 'toye@gmail.com',
        password: hashPassword('toye1234'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
