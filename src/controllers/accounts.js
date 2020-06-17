import models from '../models';

const { Accounts, Users, Transactions } = models;

const account = [
  {
    model: Users,
    as: 'details',
    attributes: ['fullname', 'email']
  },
  {
    model: Transactions,
    as: 'accountTransactions',
    attributes: ['category', 'message', 'amount', 'walletNumber', 'walletBalance'],
  }
];

/**
 * @class AccountsController
 * @description the class controller for accounts
 * @exports AccountsController
 */
export default class AccountsController {
  /**
          * @method transferMoney
          * @description method for tranferring money to another wallet number
          * @param {object} req
          * @param {object} res
          * @returns {object} Returns body object
          */
  static async transferMoney(req, res) {
    try {
      const { userId } = req.user;
      const { accountId } = req.params;
      const {
        category, message, amount, walletNumber, walletBalance,
      } = req.body;
      await Transactions.create({
        userId, accountId, category, message, amount, walletBalance, walletNumber
      });
      const currentBalance = (walletBalance - amount);
      await Transactions.update({
        walletBalance: currentBalance
      }, { where: { userId } });
      await Accounts.update({
        walletBalance: currentBalance
      }, { where: { userId } });
      return res.status(200).json({
        status: '200',
        message: 'Success!',
        data: {
          category, message, amount, currentBalance, walletNumber
        }
      });
    } catch (error) {
      return res.status(500).json({ status: '500', message: 'Oops, there\'s an error!' });
    }
  }

  /**
        * @method createAccount
        * @description method for creating account after signing up
        * @param {object} req
        * @param {object} res
        * @returns {object} Returns body object
        */
  static async createAccount(req, res) {
    try {
      const { userId } = req.user;
      const {
        walletNumber, walletBalance,
      } = req.body;
      const wallet = await Accounts.findOne({ where: { walletNumber } });
      if (wallet) {
        return res.status(409)
          .json({ status: '409', message: 'It seems this account has been created already...' });
      }
      await Accounts.create({
        userId, walletBalance, walletNumber
      });
      return res.status(201).json({
        status: '201',
        message: 'Success!',
        data: {
          walletBalance, walletNumber
        }
      });
    } catch (error) {
      return res.status(500).json({ status: '500', message: 'Oops, there\'s an error!' });
    }
  }

  /**
      * @method getAccount
      * @description method for a user to view his/her account
      * @param {object} req
      * @param {object} res
      * @returns {object} Returns body object
      */
  static async getAccount(req, res) {
    const { userId } = req.user;
    try {
      const result = await Accounts.findOne({
        attributes: { exclude: ['createdat', 'updatedAt'] },
        where: { userId },
        include: account,
      });
      if (!result) {
        return res.status(404).json({ status: '404', message: 'Account not found!' });
      }
      return res.status(200).json({ status: '200', message: 'Success!', data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: '500', message: 'Oops, there\'s an error!' });
    }
  }
}
