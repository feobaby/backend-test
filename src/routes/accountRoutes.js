import express from 'express';
import AccountsController from '../controllers/accounts';
import Authenticate from '../middlewares/authenticate';
import ValidateTransactions from '../middlewares/validators/accounts';

const {
  getAccount, transferMoney, depositMoney
} = AccountsController;

const {
  sendMoneyValidation, transactionValidation,
} = ValidateTransactions;

const { verifyToken } = Authenticate;

const router = express.Router();

router.post('/send/:accountId', verifyToken, sendMoneyValidation, transactionValidation, transferMoney);
router.get('/view', verifyToken, getAccount);
router.post('/deposit/:accountId', verifyToken, depositMoney);

export default router;
