export default {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Transactions',
    [
      {
        id: '9387ae92-ef9e-4224-8ace-b32d4a271830',
        userId: '7aa38d4e-7fbf-4067-8821-9c27d2fb6e3a',
        accountId: '6c8f5528-c442-477e-97f0-75c8e0c62f33',
        category: 'transfer money',
        message: 'The remaining balance for event planning.',
        amount: '0.00',
        walletNumber: '0908978654',
        walletBalance: '50000.00',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '515343f9-6348-4403-9291-270ba6de7cca',
        userId: 'ea38fb9a-57ab-4d07-9c6b-01e0b429d101',
        accountId: 'f87a05a7-8a66-42c7-b2a6-e630dc2cd2b2',
        category: 'pay airtime',
        amount: '0.00',
        walletNumber: '7772777277',
        walletBalance: '100000.00',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),
  down: (queryInterface) => queryInterface.bulkDelete('Transactions', null, {}),
};
