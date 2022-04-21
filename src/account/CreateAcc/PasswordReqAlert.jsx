import React from "react";
import {
  pwUpperLowerCase,
  pwNumeric,
  pwSpecialCharCheck,
} from "../AccountsUtils";

const PasswordReqAlert = (props) => {
  const { password } = props;

  const passwordLength =
    password.data && password.data.length > 8 ? "valid" : "invalid";

  return (
    <ul className="signUp__field__requirements">
      <p>Password must:</p>

      <li className={passwordLength}>be at least 8 characters.</li>
      <li className={pwUpperLowerCase(password.data)}>
        contain an Uppercase and lowercase letter (A, z)
      </li>
      <li className={pwNumeric(password.data)}>
        contain a numberic character (0-9)
      </li>
      <li className={pwSpecialCharCheck(password.data)}>
        contain a special character (!,@,#,etc.)
      </li>
    </ul>
  );
};

export default PasswordReqAlert;
