import express from 'express';
import UsersController from '../controllers/users';
import ValidateUsers from '../middlewares/validators/users';

const {
  createUser, signInUser,
} = UsersController;

const { signUpValidation, signInValidation, fieldValidation } = ValidateUsers;

const router = express.Router();

router.post('/signup', fieldValidation, signUpValidation, createUser);
router.post('/signin', signInValidation, signInUser);

export default router;
