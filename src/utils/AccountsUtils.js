const emailFormat = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const passwordReq = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

module.exports = {
  pwNumeric: function (password) {
    const numericRegex = new RegExp(/(?=.*\d)/);

    if (numericRegex.test(password)) {
      return "valid";
    } else {
      return "invalid";
    }
  },

  pwSpecialCharCheck: function (password) {
    const specialCharRegex = new RegExp(/(?=.[!@#$%^&])/);

    if (specialCharRegex.test(password)) {
      return "valid";
    } else {
      return "invalid";
    }
  },

  pwUpperLowerCase: function (password) {
    const upperLowerCaseRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])/);

    if (upperLowerCaseRegex.test(password)) {
      return "valid";
    } else {
      return "invalid";
    }
  },

  nameLength: function (name) {
    if (name.length < 3) {
      return {
        valid: false,
        data: name,
        error: "Names must be at least 3 characters.",
      };
    } else {
      return { valid: true, data: name };
    }
  },

  emailValidator: function (email) {
    if (emailFormat.test(email)) {
      return { valid: true, data: email };
    } else {
      return {
        valid: false,
        data: email,
        error: "Please enter a valid email address",
      };
    }
  },

  passwordValidator: function (password) {
    if (passwordReq.test(password)) {
      return { valid: true, data: password };
    } else {
      return {
        valid: false,
        data: password,
        error: "Password doesn't match out criteria.",
      };
    }
  },

  userNameCheck: function (user_name) {
    if (user_name < 2) {
      return "Names must be at least 2 characters";
    }
  },

  passwordMatchCheck: function (password, passwordRepeated) {
    if (passwordRepeated !== password) {
      return {
        valid: false,
        data: passwordRepeated,
        error: "Password doesn't match",
      };
    } else {
      return { valid: true, data: passwordRepeated };
    }
  },

  triggerErrorShake: function () {
    return "error shake";
  },
};
