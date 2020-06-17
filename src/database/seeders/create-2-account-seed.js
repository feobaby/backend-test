export default {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Accounts',
    [
      {
        id: '6c8f5528-c442-477e-97f0-75c8e0c62f33',
        userId: '7aa38d4e-7fbf-4067-8821-9c27d2fb6e3a',
        walletNumber: '0909098',
        walletBalance: '50000.00',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f87a05a7-8a66-42c7-b2a6-e630dc2cd2b2',
        userId: 'ea38fb9a-57ab-4d07-9c6b-01e0b429d101',
        walletNumber: '9098765',
        walletBalance: '100000.00',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),
  down: (queryInterface) => queryInterface.bulkDelete('Accounts', null, {}),
};
