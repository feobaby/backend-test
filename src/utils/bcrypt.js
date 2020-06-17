import bcrypt from 'bcryptjs';

/**
 * @class Helper
 * @description helper file
 * @exports Helper
 */
export default class Helper {
  /**
     *
     * @param {string} password
     * @returns {string} returns the hashed password
     */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  /**
     *
     * @param {string} password
     * @param {string} hashPassword
     * @returns {Boolean} return True or False
     */
  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }
}
