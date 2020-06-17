import express from 'express';
import BillsController from '../controllers/bills';
import Authenticate from '../middlewares/authenticate';
import ValidateBills from '../middlewares/validators/bills';
import ValidateTransactions from '../middlewares/validators/accounts';

const {
  transactionValidation,
} = ValidateTransactions;

const {
  buyAirtime, payElectricity,
} = BillsController;

const { buyAirtimeValidation, payElecValidation } = ValidateBills;

const { verifyToken } = Authenticate;

const router = express.Router();

router.post('/airtime/:accountId', verifyToken, buyAirtimeValidation, transactionValidation, buyAirtime);
router.post('/electricity/:accountId', verifyToken, payElecValidation, transactionValidation, payElectricity);

export default router;
