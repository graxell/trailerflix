const emailFormat = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const passwordReq = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

export const pwNumeric = function (password) {
  const numericRegex = new RegExp(/(?=.*\d)/);

  if (numericRegex.test(password)) {
    return "valid";
  } else {
    return "invalid";
  }
};

export const pwSpecialCharCheck = function (password) {
  const specialCharRegex = new RegExp(/(?=.[!@#$%^&])/);

  if (specialCharRegex.test(password)) {
    return "valid";
  } else {
    return "invalid";
  }
};

export const pwUpperLowerCase = function (password) {
  const upperLowerCaseRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])/);

  if (upperLowerCaseRegex.test(password)) {
    return "valid";
  } else {
    return "invalid";
  }
};

export const nameLength = function (name) {
  if (name.length < 3) {
    return {
      // valid: false,
      data: name,
      error: "Names must be at least 3 characters.",
    };
  } else {
    return name;
  }
};

export const emailValidator = function (email) {
  if (emailFormat.test(email)) {
    return email;
  } else {
    return {
      data: email,
      error: "Please enter a valid email address",
    };
  }
};

export const passwordValidator = function (password) {
  if (passwordReq.test(password)) {
    // return { valid: true, data: password };
    return password;
  } else {
    return {
      // valid: false,
      data: password,
      error: "Password doesn't match our criteria.",
    };
  }
};

export const userNameCheck = function (user_name) {
  if (user_name < 3) {
    return "Names must be at least 3 characters";
  }
};

export const passwordMatchCheck = function (password, passwordRepeated) {
  if (passwordRepeated !== password) {
    return {
      data: passwordRepeated,
      error: "Password doesn't match",
    };
  } else {
    return passwordRepeated;
  }
};

export const triggerErrorShake = function () {
  return "error shake";
};

export const accountColours = [
  "crayola",
  "orange",
  "seaGreen",
  "violet",
  "lemon",
  "blue",
];

export const profileNameCheck = function (array, current, newName) {
  if (current && current === newName) {
    return { error: "Oops, you forgot to change something!" };
  } else if (
    newName.length < 3 ||
    array.some((item) => item.profile_name === newName)
  ) {
    return {
      error: "Please enter a new name of at least 3 characters.",
    };
  } else {
    return newName;
  }
};

export const getProfileIndex = function (list, item) {
  const index =
    list &&
    list.findIndex((object) => {
      return object.profile_name === item;
    });

  return index;
};
