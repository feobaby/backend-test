import models from '../models';

const { Accounts, Users, Transactions } = models;

// associations for when a user wants to view his/her account
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
        message, amount, walletNumber, walletBalance,
      } = req.body;
      const check = await Accounts.findOne({ where: { walletNumber } });
      if (!check) {
        return res.status(404).json({
          status: '404',
          message: 'This wallet number does not exist',
        });
      }
      await Transactions.create({
        userId, accountId, category: 'transfer money', message, amount, walletBalance, walletNumber
      });
      const currentBalance = parseFloat(walletBalance) - parseFloat(amount);
      // to update the account of the current blance after a transaction
      await Accounts.update({
        walletBalance: currentBalance
      }, { where: { userId } });
      return res.status(200).json({
        status: '200',
        message: 'Success!',
        data: {
          category: 'transfer money', message, amount, currentBalance, walletNumber
        }
      });
    } catch (error) {
      return res.status(500).json({ status: '500', message: 'Oops, there\'s an error!' });
    }
  }

  /**
      * @method depositMoney
      * @description method for depositing money to the available wallet balance
      * @param {object} req
      * @param {object} res
      * @returns {object} Returns body object
      */
  static async depositMoney(req, res) {
    try {
      const { userId } = req.user;
      const { accountId } = req.params;
      const {
        amount, walletBalance,
      } = req.body;
      // to create the transaction(for history purposes)
      await Transactions.create({
        userId, accountId, category: 'deposit', amount, walletBalance,
      });
      const currentBalance = parseFloat(walletBalance) + parseFloat(amount);
      // to update the account of the current blance after a transaction
      await Accounts.update({
        walletBalance: currentBalance
      }, { where: { userId } });
      return res.status(200).json({
        status: '200',
        message: 'Success!',
        data: {
          category: 'deposit', amount, currentBalance,
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
      return res.status(500).json({ status: '500', message: 'Oops, there\'s an error!' });
    }
  }
}
