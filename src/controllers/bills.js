import models from '../models';

const { Bills, Transactions, Accounts } = models;

/**
 * @class BillsController
 * @description the class controller for bills
 * @exports BillsController
 */
export default class BillsController {
  /**
          * @method buyAirtime
          * @description method for buying airtime
          * @param {object} req
          * @param {object} res
          * @returns {object} Returns body object
          */
  static async buyAirtime(req, res) {
    try {
      const { userId } = req.user;
      const { accountId } = req.params;
      const {
        message, amount, airtime, walletBalance,
      } = req.body;
      // to log the transactions
      await Transactions.create({
        userId, accountId, category: 'pay airtime', message, amount, walletBalance
      });
      const currentBalance = (walletBalance - amount);
      // to update wallet balance
      await Accounts.update({
        walletBalance: currentBalance
      }, { where: { userId } });
      await Bills.create({
        userId, airtime, amount, accountId
      });
      return res.status(200).json({
        status: '200',
        message: 'Success!',
        data: {
          userId, accountId, category: 'pay airtime', message, amount, currentBalance, airtime
        }
      });
    } catch (error) {
      return res.status(500).json({ status: '500', message: 'Oops, there\'s an error!' });
    }
  }

  /**
          * @method payElectricity
          * @description method for paying electricity
          * @param {object} req
          * @param {object} res
          * @returns {object} Returns body object
          */
  static async payElectricity(req, res) {
    try {
      const { userId } = req.user;
      const { accountId } = req.params;
      const {
        message, amount, electricity, walletBalance, meterNo,
      } = req.body;
      // to log in the transactions
      await Transactions.create({
        userId, accountId, category: 'pay for electricity', message, amount, walletBalance
      });
      const currentBalance = (walletBalance - amount);
      // to update wallet balance
      await Accounts.update({
        walletBalance: currentBalance
      }, { where: { userId } });
      // to represent the table holding the bills
      await Bills.create({
        userId, accountId, electricity, amount, meterNo,
      });
      return res.status(200).json({
        status: '200',
        message: 'Success!',
        data: {
          userId, accountId, category: 'pay for electricity', meterNo, message, amount, currentBalance, electricity
        }
      });
    } catch (error) {
      return res.status(500).json({ status: '500', message: 'Oops, there\'s an error!' });
    }
  }
}
