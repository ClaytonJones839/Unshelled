const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateLoginInput(data) {
    data.email = validText(data.email) ? data.email : "";
    data.password = validText(data.password) ? data.password : "";
    let isThisValid = true;
    let messages = [];

    if (!Validator.isEmail(data.email)) {
        // return { message: "Email is invalid", isValid: false };
        messages.push("Email is invalid");
        isThisValid = false;
    }

    if (Validator.isEmpty(data.email)) {
        // return { message: "Email field is required", isValid: false };
        messages.push("Email field is required");
        isThisValid = false;
    }

    if (Validator.isEmpty(data.password)) {
        // return { message: "Password field is required", isValid: false };
        messages.push("Password field is required");
        isThisValid = false;
    }

    if (isThisValid = false) {
      return {
        message: messages,
        isValid: false
      }
    }

    return {
        message: "",
        isValid: true
    };
};
