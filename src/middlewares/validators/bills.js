/**
 * @class ValidateBills
 * @description
 * @exports ValidateBills
 */
export default class ValidateBills {
  /**
     * @method buyAirtimeValidation
     * @description Method for validating the the process of buying airtime
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} response body object
     */
  static async buyAirtimeValidation(req, res, next) {
    if (!req.body.airtime || !req.body.amount
      || !req.body.walletBalance) {
      return res.status(400).json({
        status: '400',
        error: 'Please supply all the rewuired fields!',
      });
    }
    next();
  }

  /**
  * @method payElecValidation
  * @description Method for validating the the process of buying airtime
  * @param {object} req
  * @param {object} res
  * @param {object} next
  * @returns {object} response body object
  */
  static async payElecValidation(req, res, next) {
    if (!req.body.meterNo || !req.body.amount
      || !req.body.walletBalance) {
      return res.status(400).json({
        status: '400',
        error: 'Please supply all the rewuired fields!',
      });
    }
    next();
  }
}
