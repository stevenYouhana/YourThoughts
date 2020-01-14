var validator = require('email-validator');

module.exports.EmailValidator = {
  validateEmail: function(mail) {
    console.info("validateEmail: function(mail)");
    if (!validator.validate(mail)) {
      return false;
    }
    return true;
  }
}
