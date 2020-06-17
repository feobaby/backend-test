import models from '../models';
import { generateToken } from '../utils/index';
import Helper from '../utils/bcrypt';

const { Users } = models;
const { hashPassword } = Helper;
/**
 * @class UserController
 * @description the class controller for users
 * @exports UsersController
 */
export default class UsersController {
  /**
    * @method createUser
    * @description method for signing up a user
    * @param {object} req
    * @param {object} res
    * @returns {object} Returns body object
  */
  static async createUser(req, res) {
    try {
      const {
        email,
      } = req.body;
      req.body.password = await hashPassword(req.body.password);
      const userEmail = await Users.findOne({ where: { email } });
      if (userEmail) {
        return res.status(409)
          .json({ status: '409', message: 'This email exists already.' });
      }
      const result = await Users.create(req.body);
      const { id: userId } = result;
      const token = await generateToken({ userId });
      return res.status(201).json({
        status: '201', message: 'Welcome to Mkobo Wallet!', data: result, token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: '500', message: 'Oops, there\'s an error!' });
    }
  }

  /**
      * @method signInUser
      * @description Method for user sign in
      * @param {object} req - The Request Object
      * @param {object} res - The Response Object
      * @returns {object} response body object
 */
  static async signInUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ status: '401', message: 'Unauthorised email, sorry.' });
      }
      const isPasswordValid = await Helper.comparePassword(user.password, password);
      if (!isPasswordValid) {
        return res.status(401).json({ status: '401', message: 'Unauthorised password, sorry.' });
      }
      const {
        id: userId,
      } = user;
      const token = await generateToken({ userId });
      return res.status(200).json({
        status: '200', user, token,
      });
    } catch (error) {
      return res.status(500).json({ status: '500', message: 'Oops, there\'s an error!' });
    }
  }
}
