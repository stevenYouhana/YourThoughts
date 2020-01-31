var validator = require('email-validator');

module.exports.EmailValidator = {
  validateEmail: function(mail) {
    if (!validator.validate(mail)) {
      console.error("invalid email!");
      return false;
    }
    return true;
  }
}
