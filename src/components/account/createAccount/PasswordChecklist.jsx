import React from "react";
import {
  pwUpperLowerCase,
  pwNumeric,
  pwSpecialCharCheck,
} from "../../../utils/AccountsUtils";

const PasswordChecklist = (props) => {
  const { password } = props;

  const passwordLength = password && password.length > 8 ? "valid" : "invalid";

  return (
    <ul className="signUp__field__requirements">
      <p>Password must:</p>

      <li className={passwordLength}>be at least 8 characters.</li>
      <li className={pwUpperLowerCase(password)}>
        contain an Uppercase and lowercase letter (A, z)
      </li>
      <li className={pwNumeric(password)}>
        contain a numberic character (0-9)
      </li>
      <li className={pwSpecialCharCheck(password)}>
        contain a special character (!,@,#,etc.)
      </li>
    </ul>
  );
};

export default PasswordChecklist;
