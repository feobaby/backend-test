import { Router } from 'express';
import userRoute from './userRoutes';
import billRoute from './billRoutes';
import accountRoute from './accountRoutes';

const router = new Router();

router.use('/users', userRoute);
router.use('/bill', billRoute);
router.use('/account', accountRoute);

export default router;
