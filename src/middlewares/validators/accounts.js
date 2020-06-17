/**
 * @class ValidateTransactions
 * @description
 * @exports ValidateTransactions
 */
export default class ValidateTransactions {
  /**
     * @method ValidateTransactions
     * @description Method for validating the user transactions
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} returns the object
     */
  static transactionValidation(req, res, next) {
    const amount = parseFloat(req.body.amount);
    const walletBalance = parseFloat(req.body.walletBalance);
    const result = (amount > walletBalance);
    switch (true) {
      case (result):
        return res.status(400).json({
          status: '400',
          error: 'Insufficient balance',
        });
      case (amount <= 99.99):
        return res.status(400).json({
          status: '400',
          error: 'Not processable, You can only transact N100 and above.',
        });
      default:
        next();
    }
  }

  /**
  * @method sendMoneyValidation
  * @description Method for validating the fields
  * @param {object} req
  * @param {object} res
  * @param {object} next
  * @returns {object} response body object
  */
  static async sendMoneyValidation(req, res, next) {
    if (!req.body.category || !req.body.amount
      || !req.body.walletBalance || !req.body.walletNumber) {
      return res.status(400).json({
        status: '400',
        error: 'Please supply all the rewuired fields!',
      });
    }
    next();
  }
}
