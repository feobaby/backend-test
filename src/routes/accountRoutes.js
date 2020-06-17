import express from 'express';
import AccountsController from '../controllers/accounts';
import Authenticate from '../middlewares/authenticate';
import ValidateTransactions from '../middlewares/validators/accounts';

const {
  getAccount, transferMoney, createAccount
} = AccountsController;

const {
  sendMoneyValidation, transactionValidation,
} = ValidateTransactions;

const { verifyToken } = Authenticate;

const router = express.Router();

router.post('/send/:accountId', verifyToken, sendMoneyValidation, transactionValidation, transferMoney);
router.post('/create', verifyToken, createAccount);
router.get('/view', verifyToken, getAccount);

export default router;
