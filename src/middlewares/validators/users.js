import {
  emailRegExp, nameRegExp,
} from '../../utils/index';

/**
 * @class ValidateUsers
 * @description
 * @exports ValidateUsers
 */
export default class ValidateUsers {
  /**
     * @method signUpValidation
     * @description Method for validating the sign up of a user
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} returns the object
     */
  static signUpValidation(req, res, next) {
    const {
      fullname, email,
    } = req.body;
    switch (true) {
      case (!email.match(emailRegExp)):
        return res.status(400).json({
          status: '400',
          error: 'Please, supply a valid email!',
        });
      case (!fullname.match(nameRegExp)):
        return res.status(400).json({
          status: '400',
          error: 'Please, supply valid name(s)!',
        });
      default:
        next();
    }
  }

  /**
     * @method fieldValidation
     * @description Method for validating the sign up fields
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} returns the object
     */
  static fieldValidation(req, res, next) {
    const {
      fullname, email, password
    } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({
        status: '400',
        error: 'Please, supply the fields!',
      });
    }
    next();
  }

  /**
     * @method signInValidation
     * @description Method for validating the sign in of a user
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} response body object
     */
  static async signInValidation(req, res, next) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: '400',
        error: 'No email or password!',
      });
    }
    next();
  }
}
